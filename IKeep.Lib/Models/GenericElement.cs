using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class GenericElement : Entity
    {
        public string Name { get; set; }
        public Guid ElementTypeId { get; set; }
        
        [JsonIgnore]
        public virtual ElementType ElementType { get; set; }

        public string ElementTypeName
        {
            get
            {
                return ElementType == null? "" : ElementType.Name;
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

