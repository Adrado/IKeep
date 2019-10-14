using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class ElementObservation : Entity
    {
        public Guid ElementId { get; set; }
        public Element Element { get; set; }
        public Guid ObservationId { get; set; }
        public Observation Observation { get; set; }
    }
}
