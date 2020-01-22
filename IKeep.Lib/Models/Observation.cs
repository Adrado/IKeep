using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Observation : Entity
    {
        public string Description { get; set; }
        public Type Type { get; set; }

        [JsonIgnore]
        public virtual ICollection<ElementObservation> ElementObservations { get; set; }
        
    }

    public enum Type
    {
        General,
        Specific
    }
}
