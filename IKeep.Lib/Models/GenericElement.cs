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
        // Vigilar las posibilidades del campo Status
        public StatusElement Status { get; set; }
        public Guid ElementTypeId { get; set; }

        [JsonIgnore]
        public ICollection<Element> Elements { get; set; }
        public List<Guid> ElementsIds
        {
            get
            {
                return Elements == null ? new List<Guid>() : Elements.Select(x => x.Id).ToList();
            }
        }
    }

    public enum StatusElement
    {
        Active,
        Inactive
    }
}

