using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using IKeep.Lib.Core;
using IKeep.Lib.Services;
using IKeep.Lib.Services.Dtos;
using IKeep.Web.Helpers;
using IKeep.Lib.Models;

namespace IKeep.Web.Security
{
    public class JwtLoginService : SimpleLoginService
    {
        private readonly AppSettings _appSettings;

        public JwtLoginService(IRepository<User> usersRepository, IOptions<AppSettings> appSettings)
            : base(usersRepository)
        {
            _appSettings = appSettings.Value;
        }

        public override User Authenticate(LoginRequest loginRequest)
        {
            var user = base.Authenticate(loginRequest);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.GetType().Name)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }
    }
}
