using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class ChoreType : Entity
    {
        public string Name { get; set; }
        [JsonIgnore]
        public virtual ICollection<GenericChore> GenericChores { get; set; }
        public List<Guid> GenericChoresIds
        {
            get
            {
                return GenericChores == null ? new List<Guid>() : GenericChores.Select(x => x.Id).ToList();
            }
        }
    }
}
