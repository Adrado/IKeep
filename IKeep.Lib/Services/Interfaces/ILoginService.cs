using IKeep.Lib.Core;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services
{
    public interface ILoginService : IGenericService
    {
        User Authenticate(LoginRequest loginRequest);
    }
}
