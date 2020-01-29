using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class ElementImage : Record
    {
        public Guid ElementId { get; set; }
        public virtual Element Element { get; set; }

    }
}
