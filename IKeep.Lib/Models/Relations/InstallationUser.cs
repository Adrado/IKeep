using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class InstallationUser : Entity
    {
        public Guid UserId { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        public string UserName
        {
            get
            {
                return User == null ? "" : User.Name;
            }
        }
        public Guid InstallationId { get; set; }
        [JsonIgnore]
        public virtual Installation Installation { get; set; }
        public string InstallationName
        {
            get
            {
                return Installation == null ? "" : Installation.Name;
            }
        }
    }
}
