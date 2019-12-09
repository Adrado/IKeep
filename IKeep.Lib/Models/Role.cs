using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Role : Entity
    {
        public string Name { get; set; }
        [JsonIgnore]
        public virtual ICollection<InstallationUser> InstallationUsers { get; set; }
        public List<Guid> InstallationUsersIds
        {
            get
            {
                return InstallationUsers == null ? new List<Guid>() : InstallationUsers.Select(x => x.Id).ToList();
            }
        }
    }
}
