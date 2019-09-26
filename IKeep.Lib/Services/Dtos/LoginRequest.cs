using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class LoginRequest
    {
        //Podría ser Email¿?
        public string LoginName { get; set; }
        public string Password { get; set; }
    }
}
