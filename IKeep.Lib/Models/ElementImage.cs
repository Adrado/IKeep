using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class ElementImage : Entity
    {
        public Guid ElementId { get; set; }
        public Element Element { get; set; }
        public string Description { get; set; }
        public Byte[] Image { get; set; }
    }
}
