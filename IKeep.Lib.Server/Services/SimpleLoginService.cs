using IKeep.Lib.Core;
using IKeep.Lib.Models;
using IKeep.Lib.Services;
using IKeep.Lib.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Server.Services
{
    public class SimpleLoginService : ILoginService
    {
        IRepository<User> UsersRepository { get; set; }

        public SimpleLoginService(IRepository<User> usersRepository)
        {
            UsersRepository = usersRepository;
        }

        public virtual User Authenticate(LoginRequest loginRequest)
        {
            var user = UsersRepository.GetAll().FirstOrDefault(x => x.Email == loginRequest.LoginName && x.Password == loginRequest.Password);

            return user;
        }
    }
}
