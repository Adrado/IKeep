using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class ElementObservation : Entity
    {
        public Guid ElementId { get; set; }
        [JsonIgnore]
        public virtual Element Element { get; set; }
        public Guid ObservationId { get; set; }
        [JsonIgnore]
        public virtual Observation Observation { get; set; }
    }
}
