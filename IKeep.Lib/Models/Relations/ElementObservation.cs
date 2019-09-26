using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class ElementObservation : Entity
    {
        public Guid GenericElementId { get; set; }
        public GenericElement GenericElement { get; set; }
        public Guid ObservationId { get; set; }
        public Observation Observation { get; set; }
    }
}
