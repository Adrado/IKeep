using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class ElementType : Entity
    {
        public string Ref { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<GenericElement> GenericElements { get; set; }
        public List<Guid> GenericElementsIds
        {
            get
            {
                return GenericElements == null ? new List<Guid>() : GenericElements.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<Element> Elements { get; set; }
        public List<Guid> ElementsIds
        {
            get
            {
                return Elements == null ? new List<Guid>() : Elements.Select(x => x.Id).ToList();
            }
        }
    }
}
