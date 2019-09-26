using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Area : Entity
    {
        public string Ref { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid FloorId { get; set; }
        [JsonIgnore]
        public ICollection<GenericElement> GenericElements { get; set; }
        public List<Guid> GenericElementsIds
        {
            get
            {
                return GenericElements == null ? new List<Guid>() : GenericElements.Select(x => x.Id).ToList();
            }
        }
        //¿Es necesario?
        public Map Map { get; set; }
    }
}
