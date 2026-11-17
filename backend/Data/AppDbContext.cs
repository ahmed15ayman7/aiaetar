using Microsoft.EntityFrameworkCore;

namespace Aiaetar.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Certificate> Certificates => Set<Certificate>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
    public DbSet<ContactRequest> ContactRequests => Set<ContactRequest>();
    public DbSet<Media> MediaItems => Set<Media>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Certificate>(entity =>
        {
            entity.ToTable("Certificate");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.TraineeId).HasColumnName("traineeId");
            entity.Property(e => e.CertificateNo).HasColumnName("certificateNo");
            entity.Property(e => e.FullName).HasColumnName("fullName");
            entity.Property(e => e.AccreditationBody).HasColumnName("accreditationBody");
            entity.Property(e => e.CertificateType).HasColumnName("certificateType");
            entity.Property(e => e.TrainingProgram).HasColumnName("trainingProgram");
            entity.Property(e => e.JobTitle).HasColumnName("jobTitle");
            entity.Property(e => e.Workplace).HasColumnName("workplace");
            entity.Property(e => e.TrainingDate).HasColumnName("trainingDate").HasColumnType("timestamp(3) without time zone");
            entity.Property(e => e.TrainingHours).HasColumnName("trainingHours");
            entity.Property(e => e.IssuedAt).HasColumnName("issuedAt").HasColumnType("timestamp(3) without time zone");
            entity.Property(e => e.UpdatedAt).HasColumnName("updatedAt").HasColumnType("timestamp(3) without time zone");
            entity.HasIndex(e => e.TraineeId).IsUnique();
            entity.HasIndex(e => e.CertificateNo).IsUnique();
        });

        modelBuilder.Entity<AdminUser>(entity =>
        {
            entity.ToTable("AdminUser");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.CreatedAt).HasColumnName("createdAt").HasColumnType("timestamp(3) without time zone");
            entity.HasIndex(e => e.Email).IsUnique();
        });

        modelBuilder.Entity<ContactRequest>(entity =>
        {
            entity.ToTable("ContactRequest");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Phone).HasColumnName("phone");
            entity.Property(e => e.Message).HasColumnName("message");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Notes).HasColumnName("notes");
            entity.Property(e => e.CreatedAt).HasColumnName("createdAt").HasColumnType("timestamp(3) without time zone");
            entity.Property(e => e.UpdatedAt).HasColumnName("updatedAt").HasColumnType("timestamp(3) without time zone");
        });

        modelBuilder.Entity<Media>(entity =>
        {
            entity.ToTable("Media");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Url).HasColumnName("url");
            entity.Property(e => e.PublicId).HasColumnName("publicId");
            entity.Property(e => e.Type).HasColumnName("type");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Width).HasColumnName("width");
            entity.Property(e => e.Height).HasColumnName("height");
            entity.Property(e => e.Format).HasColumnName("format");
            entity.Property(e => e.CreatedAt).HasColumnName("createdAt").HasColumnType("timestamp(3) without time zone");
            entity.Property(e => e.UpdatedAt).HasColumnName("updatedAt").HasColumnType("timestamp(3) without time zone");
            entity.HasIndex(e => e.PublicId).IsUnique();
        });
    }
}
