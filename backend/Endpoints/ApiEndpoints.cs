using System.Security.Cryptography;
using System.Text.Json;
using System.Text.RegularExpressions;
using Aiaetar.Api.Auth;
using Aiaetar.Api.Data;
using Aiaetar.Api.Services;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Aiaetar.Api.Endpoints;

public static class ApiEndpoints
{
    public static void MapAiaetarApi(this WebApplication app)
    {
        app.MapGet("/api/health", () => Results.Json(new { ok = true }));

        app.MapGet("/api/verify", Verify);
        app.MapPost("/api/contact", CreateContact);
        app.MapGet("/api/gallery", PublicGallery);

        app.MapGet("/api/admin/check", AdminExists);
        app.MapPost("/api/admin/login", Login);
        app.MapPost("/api/admin/logout", Logout);
        app.MapPost("/api/admin/register", Register);

        app.MapGet("/api/admin/stats", Stats);
        app.MapGet("/api/admin/certificates", ListCertificates);
        app.MapPost("/api/admin/certificates", CreateCertificate);
        app.MapPut("/api/admin/certificates/{id}", UpdateCertificate);
        app.MapDelete("/api/admin/certificates/{id}", DeleteCertificate);
        app.MapGet("/api/admin/export", ExportCertificates);
        app.MapPost("/api/admin/import", ImportCertificates);

        app.MapGet("/api/admin/admins", ListAdmins);
        app.MapDelete("/api/admin/admins/{id}", DeleteAdmin);

        app.MapGet("/api/admin/requests", ListRequests);
        app.MapGet("/api/admin/requests/count", RequestCount);
        app.MapPatch("/api/admin/requests/{id}", UpdateRequest);
        app.MapDelete("/api/admin/requests/{id}", DeleteRequest);

        app.MapGet("/api/admin/media", ListMedia);
        app.MapPost("/api/admin/media/upload", UploadMedia);
        app.MapPatch("/api/admin/media/{id}", UpdateMedia);
        app.MapDelete("/api/admin/media/{id}", DeleteMedia);
    }

    private static string Secret(HttpContext http) =>
        Environment.GetEnvironmentVariable("ADMIN_JWT_SECRET")
        ?? http.RequestServices.GetRequiredService<IConfiguration>()["AdminJwtSecret"]
        ?? "fallback-secret-change-in-production";

    private static (string Id, string Email)? Session(HttpContext http) =>
        AdminAuth.Read(http.Request, Secret(http));

    private static IResult Unauthorized() =>
        Results.Json(new { error = "Unauthorized" }, statusCode: 401);

    private static string NewId()
    {
        var bytes = RandomNumberGenerator.GetBytes(12);
        return "c" + Convert.ToHexString(bytes).ToLowerInvariant();
    }

    private static DateTime Now() => DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified);

    private static bool IsUnique(DbUpdateException exception) =>
        exception.InnerException is PostgresException postgres && postgres.SqlState == PostgresErrorCodes.UniqueViolation;

    private static async Task<IResult> Verify(string? q, AppDbContext db)
    {
        var query = q?.Trim();
        if (string.IsNullOrEmpty(query) || query.Length < 2)
            return Results.Json(new { error = "Query too short" }, statusCode: 400);

        var certificate = await db.Certificates.AsNoTracking().FirstOrDefaultAsync(item =>
            EF.Functions.ILike(item.CertificateNo, query) ||
            EF.Functions.ILike(item.TraineeId, query));

        return certificate == null
            ? Results.Json(new { found = false })
            : Results.Json(new { found = true, certificate });
    }

    private static async Task<IResult> CreateContact(HttpRequest request, AppDbContext db)
    {
        JsonElement body;
        try
        {
            body = await request.ReadFromJsonAsync<JsonElement>();
        }
        catch
        {
            return Results.Json(new { error = "Invalid request body" }, statusCode: 400);
        }

        var name = Text(body, "name");
        var email = Text(body, "email");
        var phone = Text(body, "phone");
        var message = Text(body, "message");
        if (name.Length == 0 || email.Length == 0 || phone.Length == 0 || message.Length == 0)
            return Results.Json(new { error = "All fields are required" }, statusCode: 422);
        if (!EmailPattern.IsMatch(email))
            return Results.Json(new { error = "Invalid email address" }, statusCode: 422);

        var now = Now();
        var record = new ContactRequest
        {
            Id = NewId(),
            Name = name,
            Email = email.ToLowerInvariant(),
            Phone = phone,
            Message = message,
            Status = "new",
            CreatedAt = now,
            UpdatedAt = now,
        };
        db.ContactRequests.Add(record);
        await db.SaveChangesAsync();
        return Results.Json(new { ok = true, id = record.Id }, statusCode: 201);
    }

    private static async Task<IResult> PublicGallery(string? type, string? cursor, int? take, AppDbContext db)
    {
        var pageSize = Math.Min(take ?? 24, 100);
        if (pageSize < 1) pageSize = 1;
        var items = await PageMedia(db.MediaItems.AsNoTracking(), type, cursor, pageSize);
        return Results.Json(new
        {
            items = items.Rows.Select(item => new
            {
                item.Id,
                item.Url,
                item.Type,
                item.Description,
                item.Width,
                item.Height,
                item.CreatedAt,
            }),
            nextCursor = items.NextCursor,
        });
    }

    private static async Task<IResult> AdminExists(AppDbContext db)
    {
        var hasAdmin = await db.AdminUsers.AnyAsync();
        return Results.Json(new { hasAdmin });
    }

    private static async Task<IResult> Login(HttpRequest request, AppDbContext db)
    {
        var body = await ReadObject(request);
        var email = Text(body, "email");
        var password = Text(body, "password");
        if (email.Length == 0 || password.Length == 0)
            return Results.Json(new { error = "Email and password required" }, statusCode: 400);

        var user = await db.AdminUsers.FirstOrDefaultAsync(item => item.Email == email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            return Results.Json(new { error = "Invalid credentials" }, statusCode: 401);

        var token = AdminAuth.Sign(user.Id, user.Email, Secret(request.HttpContext));
        request.HttpContext.Response.Cookies.Append(AdminAuth.CookieName, token, new CookieOptions
        {
            HttpOnly = true,
            Secure = request.IsHttps,
            SameSite = SameSiteMode.Lax,
            MaxAge = TimeSpan.FromHours(8),
            Path = "/",
        });
        return Results.Json(new { ok = true, name = user.Name });
    }

    private static IResult Logout(HttpContext http)
    {
        http.Response.Cookies.Delete(AdminAuth.CookieName, new CookieOptions { Path = "/" });
        return Results.Json(new { ok = true });
    }

    private static async Task<IResult> Register(HttpRequest request, AppDbContext db)
    {
        var body = await ReadObject(request);
        var name = Text(body, "name");
        var email = Text(body, "email");
        var password = Text(body, "password");
        if (name.Length == 0 || email.Length == 0 || password.Length == 0)
            return Results.Json(new { error = "Name, email and password are required" }, statusCode: 400);

        var adminCount = await db.AdminUsers.CountAsync();
        if (adminCount > 0 && Session(request.HttpContext) == null)
        {
            return Results.Json(
                new { error = "An admin already exists. Please log in to add more accounts." },
                statusCode: 403);
        }

        if (password.Length < 8)
            return Results.Json(new { error = "Password must be at least 8 characters." }, statusCode: 422);

        if (await db.AdminUsers.AnyAsync(item => item.Email == email))
            return Results.Json(new { error = "An account with this email already exists." }, statusCode: 409);

        var user = new AdminUser
        {
            Id = NewId(),
            Email = email,
            Password = BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12),
            Name = name,
            CreatedAt = Now(),
        };
        db.AdminUsers.Add(user);
        await db.SaveChangesAsync();
        return Results.Json(new { ok = true, id = user.Id, email = user.Email, name = user.Name }, statusCode: 201);
    }

    private static async Task<IResult> Stats(HttpContext http, AppDbContext db)
    {
        if (Session(http) == null) return Unauthorized();
        var since = Now().AddDays(-30);
        var total = await db.Certificates.CountAsync();
        var recentCount = await db.Certificates.CountAsync(item => item.IssuedAt >= since);
        var breakdown = await db.Certificates
            .GroupBy(item => item.TrainingProgram)
            .Select(group => new { trainingProgram = group.Key, count = group.Count() })
            .OrderByDescending(item => item.count)
            .Take(5)
            .ToListAsync();
        var recent = await db.Certificates.AsNoTracking()
            .OrderByDescending(item => item.IssuedAt)
            .Take(5)
            .Select(item => new
            {
                item.Id,
                item.TraineeId,
                item.CertificateNo,
                item.FullName,
                item.TrainingProgram,
                item.IssuedAt,
            })
            .ToListAsync();

        return Results.Json(new
        {
            total,
            recentCount,
            programBreakdown = breakdown.Select(item => new
            {
                item.trainingProgram,
                _count = new { _all = item.count },
            }),
            recent,
        });
    }

    private static async Task<IResult> ListCertificates(HttpContext http, int? page, int? limit, string? q, AppDbContext db)
    {
        if (Session(http) == null) return Unauthorized();
        var pageNumber = Math.Max(1, page ?? 1);
        var pageSize = Math.Clamp(limit ?? 20, 1, 100);
        var query = db.Certificates.AsNoTracking();
        var term = q?.Trim() ?? "";
        if (term.Length > 0)
        {
            var pattern = $"%{term}%";
            query = query.Where(item =>
                EF.Functions.ILike(item.FullName, pattern) ||
                EF.Functions.ILike(item.CertificateNo, pattern) ||
                EF.Functions.ILike(item.TraineeId, pattern) ||
                EF.Functions.ILike(item.TrainingProgram, pattern));
        }

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(item => item.IssuedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return Results.Json(new { total, page = pageNumber, limit = pageSize, items });
    }

    private static async Task<IResult> CreateCertificate(HttpRequest request, AppDbContext db)
    {
        if (Session(request.HttpContext) == null) return Unauthorized();
        var certificate = await ReadCertificate(request);
        if (certificate == null) return Results.Json(new { error = "Invalid JSON" }, statusCode: 400);

        var now = Now();
        certificate.Id = NewId();
        certificate.IssuedAt = now;
        certificate.UpdatedAt = now;
        db.Certificates.Add(certificate);
        try
        {
            await db.SaveChangesAsync();
        }
        catch (DbUpdateException exception) when (IsUnique(exception))
        {
            return Results.Json(new { error = "Trainee ID or Certificate No already exists" }, statusCode: 409);
        }
        return Results.Json(certificate, statusCode: 201);
    }

    private static async Task<IResult> UpdateCertificate(string id, HttpRequest request, AppDbContext db)
    {
        if (Session(request.HttpContext) == null) return Unauthorized();
        var body = await ReadCertificate(request);
        if (body == null) return Results.Json(new { error = "Invalid JSON" }, statusCode: 400);

        var current = await db.Certificates.FirstOrDefaultAsync(item => item.Id == id);
        if (current == null) return Results.Json(new { error = "Not found" }, statusCode: 404);

        current.TraineeId = body.TraineeId;
        current.CertificateNo = body.CertificateNo;
        current.FullName = body.FullName;
        current.AccreditationBody = body.AccreditationBody;
        current.CertificateType = body.CertificateType;
        current.TrainingProgram = body.TrainingProgram;
        current.JobTitle = body.JobTitle;
        current.Workplace = body.Workplace;
        current.TrainingDate = body.TrainingDate;
        current.TrainingHours = body.TrainingHours;
        current.UpdatedAt = Now();
        try
        {
            await db.SaveChangesAsync();
        }
        catch (DbUpdateException exception) when (IsUnique(exception))
        {
            return Results.Json(new { error = "Duplicate ID or certificate number" }, statusCode: 409);
        }
        return Results.Json(current);
    }

    private static async Task<IResult> DeleteCertificate(string id, HttpContext http, AppDbContext db)
    {
        if (Session(http) == null) return Unauthorized();
        var certificate = await db.Certificates.FirstOrDefaultAsync(item => item.Id == id);
        if (certificate == null) return Results.Json(new { error = "Not found" }, statusCode: 404);
        db.Certificates.Remove(certificate);
        await db.SaveChangesAsync();
        return Results.Json(new { ok = true });
    }

    private static async Task<IResult> ExportCertificates(HttpContext http, string? q, AppDbContext db)
    {
        if (Session(http) == null) return Unauthorized();
        var query = db.Certificates.AsNoTracking();
        var term = q?.Trim() ?? "";
        if (term.Length > 0)
        {
            var pattern = $"%{term}%";
            query = query.Where(item =>
                EF.Functions.ILike(item.FullName, pattern) ||
                EF.Functions.ILike(item.CertificateNo, pattern) ||
                EF.Functions.ILike(item.TraineeId, pattern));
        }

        var certificates = await query.OrderBy(item => item.TraineeId).ToListAsync();
        var bytes = CertificateExcel.Export(certificates);
        return Results.File(
            bytes,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"certificates_{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}.xlsx");
    }

    private static async Task<IResult> ImportCertificates(HttpRequest request, AppDbContext db)
    {
        if (Session(request.HttpContext) == null) return Unauthorized();
        if (!request.HasFormContentType)
            return Results.Json(new { error = "No file" }, statusCode: 400);

        var form = await request.ReadFormAsync();
        var file = form.Files.GetFile("file");
        if (file == null) return Results.Json(new { error = "No file" }, statusCode: 400);

        await using var stream = file.OpenReadStream();
        var rows = CertificateExcel.Read(stream);
        var created = 0;
        var skipped = 0;
        var errors = new List<string>();

        foreach (var row in rows)
        {
            try
            {
                var values = row.Values;
                if (!DateTime.TryParse(Value(values, "trainingDate"), out var trainingDate))
                {
                    errors.Add($"Row skipped — invalid date: {Value(values, "trainingDate")}");
                    skipped++;
                    continue;
                }

                var certificateNo = Value(values, "certificateNo");
                var existing = await db.Certificates.FirstOrDefaultAsync(item => item.CertificateNo == certificateNo);
                if (existing == null)
                {
                    db.Certificates.Add(new Certificate
                    {
                        Id = NewId(),
                        TraineeId = Value(values, "traineeId"),
                        CertificateNo = certificateNo,
                        FullName = Value(values, "fullName"),
                        AccreditationBody = Value(values, "accreditationBody"),
                        CertificateType = Value(values, "certificateType"),
                        TrainingProgram = Value(values, "trainingProgram"),
                        JobTitle = Value(values, "jobTitle"),
                        Workplace = Value(values, "workplace"),
                        TrainingDate = trainingDate,
                        TrainingHours = int.TryParse(Value(values, "trainingHours"), out var hours) ? hours : 0,
                        IssuedAt = Now(),
                        UpdatedAt = Now(),
                    });
                }
                else
                {
                    existing.TraineeId = Value(values, "traineeId");
                    existing.FullName = Value(values, "fullName");
                    existing.AccreditationBody = Value(values, "accreditationBody");
                    existing.CertificateType = Value(values, "certificateType");
                    existing.TrainingProgram = Value(values, "trainingProgram");
                    existing.JobTitle = Value(values, "jobTitle");
                    existing.Workplace = Value(values, "workplace");
                    existing.TrainingDate = trainingDate;
                    existing.TrainingHours = int.TryParse(Value(values, "trainingHours"), out var hours) ? hours : 0;
                    existing.UpdatedAt = Now();
                }

                await db.SaveChangesAsync();
                created++;
            }
            catch (Exception exception)
            {
                db.ChangeTracker.Clear();
                errors.Add($"Row skipped — {exception.Message}");
                skipped++;
            }
        }

        return Results.Json(new { created, skipped, errors });
    }

    private static async Task<IResult> ListAdmins(HttpContext http, AppDbContext db)
    {
        if (Session(http) == null) return Unauthorized();
        var admins = await db.AdminUsers.AsNoTracking()
            .OrderBy(item => item.CreatedAt)
            .Select(item => new { item.Id, item.Email, item.Name, item.CreatedAt })
            .ToListAsync();
        return Results.Json(admins);
    }

    private static async Task<IResult> DeleteAdmin(string id, HttpContext http, AppDbContext db)
    {
        var session = Session(http);
        if (session == null) return Unauthorized();
        if (id == session.Value.Id)
            return Results.Json(new { error = "You cannot delete your own account." }, statusCode: 400);
        if (await db.AdminUsers.CountAsync() <= 1)
            return Results.Json(new { error = "Cannot delete the only admin account." }, statusCode: 400);

        var admin = await db.AdminUsers.FirstOrDefaultAsync(item => item.Id == id);
        if (admin == null) return Results.Json(new { error = "Not found" }, statusCode: 404);
        db.AdminUsers.Remove(admin);
        await db.SaveChangesAsync();
        return Results.Json(new { ok = true });
    }

    private static async Task<IResult> ListRequests(HttpContext http, string? status, string? q, string? cursor, int? take, AppDbContext db)
    {
        if (Session(http) == null) return Unauthorized();
        var pageSize = Math.Min(take ?? 20, 100);
        if (pageSize < 1) pageSize = 1;
        var query = db.ContactRequests.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(status)) query = query.Where(item => item.Status == status);
        var term = q?.Trim() ?? "";
        if (term.Length > 0)
        {
            var pattern = $"%{term}%";
            query = query.Where(item =>
                EF.Functions.ILike(item.Name, pattern) ||
                EF.Functions.ILike(item.Email, pattern) ||
                EF.Functions.ILike(item.Phone, pattern) ||
                EF.Functions.ILike(item.Message, pattern));
        }

        if (!string.IsNullOrWhiteSpace(cursor))
        {
            var marker = await db.ContactRequests.AsNoTracking().FirstOrDefaultAsync(item => item.Id == cursor);
            if (marker != null)
            {
                query = query.Where(item =>
                    item.CreatedAt < marker.CreatedAt ||
                    (item.CreatedAt == marker.CreatedAt && item.Id.CompareTo(marker.Id) < 0));
            }
        }

        var rows = await query.OrderByDescending(item => item.CreatedAt).ThenByDescending(item => item.Id)
            .Take(pageSize + 1)
            .ToListAsync();
        var hasMore = rows.Count > pageSize;
        var items = hasMore ? rows.Take(pageSize).ToList() : rows;
        var newCount = await db.ContactRequests.CountAsync(item => item.Status == "new");
        return Results.Json(new
        {
            items,
            nextCursor = hasMore ? items[^1].Id : null,
            newCount,
        });
    }

    private static async Task<IResult> RequestCount(HttpContext http, AppDbContext db)
    {
        if (Session(http) == null) return Results.Json(new { count = 0 });
        var count = await db.ContactRequests.CountAsync(item => item.Status == "new");
        return Results.Json(new { count });
    }

    private static async Task<IResult> UpdateRequest(string id, HttpRequest request, AppDbContext db)
    {
        if (Session(request.HttpContext) == null) return Unauthorized();
        var body = await ReadObject(request);
        string? status = body.ValueKind == JsonValueKind.Object && body.TryGetProperty("status", out var statusValue)
            ? statusValue.GetString()
            : null;
        string? notes = null;
        var hasNotes = false;
        if (body.ValueKind == JsonValueKind.Object && body.TryGetProperty("notes", out var notesValue))
        {
            hasNotes = true;
            notes = notesValue.ValueKind == JsonValueKind.Null ? null : notesValue.GetString();
        }

        if (status != null && status is not ("new" or "read" or "replied"))
            return Results.Json(new { error = "Invalid status" }, statusCode: 422);

        var current = await db.ContactRequests.FirstOrDefaultAsync(item => item.Id == id);
        if (current == null) return Results.Json(new { error = "Not found" }, statusCode: 404);
        if (status != null) current.Status = status;
        if (hasNotes) current.Notes = notes;
        current.UpdatedAt = Now();
        await db.SaveChangesAsync();
        return Results.Json(current);
    }

    private static async Task<IResult> DeleteRequest(string id, HttpContext http, AppDbContext db)
    {
        if (Session(http) == null) return Unauthorized();
        var current = await db.ContactRequests.FirstOrDefaultAsync(item => item.Id == id);
        if (current == null) return Results.Json(new { error = "Not found" }, statusCode: 404);
        db.ContactRequests.Remove(current);
        await db.SaveChangesAsync();
        return Results.Json(new { ok = true });
    }

    private static async Task<IResult> ListMedia(HttpContext http, string? type, string? cursor, int? take, AppDbContext db)
    {
        if (Session(http) == null) return Unauthorized();
        var pageSize = Math.Min(take ?? 50, 100);
        if (pageSize < 1) pageSize = 1;
        var page = await PageMedia(db.MediaItems.AsNoTracking(), type, cursor, pageSize);
        return Results.Json(new { items = page.Rows, nextCursor = page.NextCursor });
    }

    private static async Task<IResult> UploadMedia(HttpRequest request, AppDbContext db, CloudinaryMedia cloudinary)
    {
        if (Session(request.HttpContext) == null) return Unauthorized();
        if (!request.HasFormContentType)
            return Results.Json(new { error = "Invalid form data" }, statusCode: 400);

        var form = await request.ReadFormAsync();
        var files = form.Files.GetFiles("files");
        if (files.Count == 0) return Results.Json(new { error = "No files provided" }, statusCode: 400);

        var uploaded = new List<Media>();
        var errors = new List<string>();
        foreach (var file in files)
        {
            try
            {
                await using var stream = file.OpenReadStream();
                var isVideo = file.ContentType.StartsWith("video/", StringComparison.OrdinalIgnoreCase);
                var result = await cloudinary.UploadAsync(stream, file.FileName, isVideo);
                var now = Now();
                var media = new Media
                {
                    Id = NewId(),
                    Url = result.SecureUrl,
                    PublicId = result.PublicId,
                    Type = isVideo ? "video" : "image",
                    Width = result.Width,
                    Height = result.Height,
                    Format = result.Format,
                    CreatedAt = now,
                    UpdatedAt = now,
                };
                db.MediaItems.Add(media);
                await db.SaveChangesAsync();
                uploaded.Add(media);
            }
            catch (Exception exception)
            {
                db.ChangeTracker.Clear();
                errors.Add($"{file.FileName}: {exception.Message}");
            }
        }

        return Results.Json(new { uploaded, errors }, statusCode: 201);
    }

    private static async Task<IResult> UpdateMedia(string id, HttpRequest request, AppDbContext db)
    {
        if (Session(request.HttpContext) == null) return Unauthorized();
        var body = await ReadObject(request);
        if (body.ValueKind != JsonValueKind.Object || !body.TryGetProperty("description", out var description))
            return Results.Json(new { error = "description field required" }, statusCode: 400);

        var media = await db.MediaItems.FirstOrDefaultAsync(item => item.Id == id);
        if (media == null) return Results.Json(new { error = "Not found" }, statusCode: 404);
        media.Description = description.ValueKind == JsonValueKind.Null ? null : description.GetString();
        media.UpdatedAt = Now();
        await db.SaveChangesAsync();
        return Results.Json(media);
    }

    private static async Task<IResult> DeleteMedia(string id, HttpContext http, AppDbContext db, CloudinaryMedia cloudinary)
    {
        if (Session(http) == null) return Unauthorized();
        var media = await db.MediaItems.FirstOrDefaultAsync(item => item.Id == id);
        if (media == null) return Results.Json(new { error = "Not found" }, statusCode: 404);
        try
        {
            await cloudinary.DeleteAsync(media.PublicId, media.Type);
        }
        catch
        {
            // Keep the database delete even if the remote file is already gone.
        }

        db.MediaItems.Remove(media);
        await db.SaveChangesAsync();
        return Results.Json(new { ok = true });
    }

    private static async Task<(List<Media> Rows, string? NextCursor)> PageMedia(
        IQueryable<Media> source,
        string? type,
        string? cursor,
        int pageSize)
    {
        var query = source;
        if (!string.IsNullOrWhiteSpace(type)) query = query.Where(item => item.Type == type);
        if (!string.IsNullOrWhiteSpace(cursor))
        {
            var marker = await source.FirstOrDefaultAsync(item => item.Id == cursor);
            if (marker != null)
            {
                query = query.Where(item =>
                    item.CreatedAt < marker.CreatedAt ||
                    (item.CreatedAt == marker.CreatedAt && item.Id.CompareTo(marker.Id) < 0));
            }
        }

        var rows = await query
            .OrderByDescending(item => item.CreatedAt)
            .ThenByDescending(item => item.Id)
            .Take(pageSize + 1)
            .ToListAsync();
        var hasMore = rows.Count > pageSize;
        var page = hasMore ? rows.Take(pageSize).ToList() : rows;
        return (page, hasMore ? page[^1].Id : null);
    }

    private static async Task<JsonElement> ReadObject(HttpRequest request)
    {
        try
        {
            var body = await request.ReadFromJsonAsync<JsonElement>();
            return body.ValueKind == JsonValueKind.Undefined ? default : body;
        }
        catch
        {
            return default;
        }
    }

    private static async Task<Certificate?> ReadCertificate(HttpRequest request)
    {
        JsonElement body;
        try
        {
            body = await request.ReadFromJsonAsync<JsonElement>();
        }
        catch
        {
            return null;
        }
        if (body.ValueKind != JsonValueKind.Object) return null;

        var rawDate = Text(body, "trainingDate");
        if (!DateTime.TryParse(rawDate, out var trainingDate)) trainingDate = Now();
        int.TryParse(Text(body, "trainingHours"), out var hours);

        return new Certificate
        {
            TraineeId = Text(body, "traineeId"),
            CertificateNo = Text(body, "certificateNo"),
            FullName = Text(body, "fullName"),
            AccreditationBody = Text(body, "accreditationBody"),
            CertificateType = Text(body, "certificateType"),
            TrainingProgram = Text(body, "trainingProgram"),
            JobTitle = Text(body, "jobTitle"),
            Workplace = Text(body, "workplace"),
            TrainingDate = trainingDate,
            TrainingHours = hours,
        };
    }

    private static string Text(JsonElement body, string name)
    {
        if (body.ValueKind != JsonValueKind.Object || !body.TryGetProperty(name, out var value)) return "";
        return value.ValueKind switch
        {
            JsonValueKind.String => value.GetString()?.Trim() ?? "",
            JsonValueKind.Number => value.GetRawText().Trim(),
            _ => "",
        };
    }

    private static string Value(Dictionary<string, string> values, string key) =>
        values.TryGetValue(key, out var value) ? value.Trim() : "";

    private static readonly Regex EmailPattern = new(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", RegexOptions.Compiled);
}
