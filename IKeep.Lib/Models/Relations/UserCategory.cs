using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class UserCategory : Entity
    {
        public Guid UserId { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        public Guid CategoryId { get; set; }
        [JsonIgnore]
        public virtual Category Category { get; set; }
    }
}
