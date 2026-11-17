namespace Aiaetar.Api.Data;

public class Certificate
{
    public string Id { get; set; } = "";
    public string TraineeId { get; set; } = "";
    public string CertificateNo { get; set; } = "";
    public string FullName { get; set; } = "";
    public string AccreditationBody { get; set; } = "";
    public string CertificateType { get; set; } = "";
    public string TrainingProgram { get; set; } = "";
    public string JobTitle { get; set; } = "";
    public string Workplace { get; set; } = "";
    public DateTime TrainingDate { get; set; }
    public int TrainingHours { get; set; }
    public DateTime IssuedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class AdminUser
{
    public string Id { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string Name { get; set; } = "Admin";
    public DateTime CreatedAt { get; set; }
}

public class ContactRequest
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Message { get; set; } = "";
    public string Status { get; set; } = "new";
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class Media
{
    public string Id { get; set; } = "";
    public string Url { get; set; } = "";
    public string PublicId { get; set; } = "";
    public string Type { get; set; } = "image";
    public string? Description { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
    public string? Format { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
