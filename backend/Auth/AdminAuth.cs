using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Aiaetar.Api.Auth;

public static class AdminAuth
{
    public const string CookieName = "admin_token";

    public static string Sign(string id, string email, string secret)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var token = new JwtSecurityToken(
            claims:
            [
                new Claim("id", id),
                new Claim("email", email),
            ],
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static (string Id, string Email)? Read(HttpRequest request, string secret)
    {
        if (!request.Cookies.TryGetValue(CookieName, out var token) || string.IsNullOrWhiteSpace(token))
            return null;

        try
        {
            var handler = new JwtSecurityTokenHandler();
            var principal = handler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
                ClockSkew = TimeSpan.FromMinutes(1),
            }, out _);

            var id = principal.FindFirst("id")?.Value;
            var email = principal.FindFirst("email")?.Value;
            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(email)) return null;
            return (id, email);
        }
        catch
        {
            return null;
        }
    }
}
