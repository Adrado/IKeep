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
        public virtual ICollection<User> Users { get; set; }
        public List<Guid> UsersIds
        {
            get
            {
                return Users == null ? new List<Guid>() : Users.Select(x => x.Id).ToList();
            }
        }
    }
}
