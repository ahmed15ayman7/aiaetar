using System.IdentityModel.Tokens.Jwt;
using Aiaetar.Api.Data;
using Aiaetar.Api.Endpoints;
using Aiaetar.Api.Services;
using Microsoft.EntityFrameworkCore;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 100 * 1024 * 1024;
});

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(ConnectionString.Resolve(builder.Configuration));
});
builder.Services.AddSingleton<CloudinaryMedia>();

var app = builder.Build();
app.MapAiaetarApi();
app.Run();

static class ConnectionString
{
    public static string Resolve(IConfiguration configuration)
    {
        var url = Environment.GetEnvironmentVariable("DATABASE_URL");
        if (string.IsNullOrWhiteSpace(url))
        {
            return configuration.GetConnectionString("Default")
                ?? "Host=127.0.0.1;Port=5432;Database=aiaetar;Username=ubuntu";
        }

        if (!url.StartsWith("postgres", StringComparison.OrdinalIgnoreCase)) return url;

        var uri = new Uri(url);
        var userInfo = uri.UserInfo.Split(':', 2);
        var username = Uri.UnescapeDataString(userInfo[0]);
        var password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : "";
        var database = uri.AbsolutePath.Trim('/');
        var port = uri.Port > 0 ? uri.Port : 5432;
        var connection = $"Host={uri.Host};Port={port};Database={database};Username={username}";
        if (password.Length > 0) connection += $";Password={password}";
        return connection;
    }
}
