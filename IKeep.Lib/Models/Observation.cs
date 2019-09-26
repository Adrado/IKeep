using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Observation : Entity
    {
        public string Description { get; set; }
        public Type Type { get; set; }
    }

    public enum Type
    {
        General,
        Specific
    }
}
