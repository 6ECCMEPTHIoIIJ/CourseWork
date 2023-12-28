using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

internal class JwtTokenValidator : ISecurityTokenValidator
{
    private static TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "your string",
        ValidAudience = "your string",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mysupersecret_secretsecretsecretkey!123"))
    };

    public bool CanReadToken(string securityToken) => true;

    public ClaimsPrincipal ValidateToken(string securityToken, TokenValidationParameters validationParameters, out SecurityToken validatedToken)
    {
        var handler = new JwtSecurityTokenHandler();


        var claimsPrincipal = handler.ValidateToken(securityToken, tokenValidationParameters, out validatedToken);
        return claimsPrincipal;
    }

    public static string GenerateToken(string userid, string role)
    {

        var jwt = new JwtSecurityToken(
            issuer: tokenValidationParameters.ValidIssuer,
            audience: tokenValidationParameters.ValidAudience,
            claims: new List<Claim> {
                new (ClaimTypes.Name, userid),
                new (ClaimTypes.Role, role),
            },
            expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(300)), // время действия 2 минуты
            signingCredentials: new SigningCredentials(tokenValidationParameters.IssuerSigningKey, SecurityAlgorithms.HmacSha256));

        var token = new JwtSecurityTokenHandler().WriteToken(jwt);
        return token;
    }

    public bool CanValidateToken { get; } = true;
    public int MaximumTokenSizeInBytes { get; set; } = int.MaxValue;
}