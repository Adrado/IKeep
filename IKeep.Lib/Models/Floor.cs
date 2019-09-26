using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Floor : Entity
    {
        public string Ref { get; set; }
        public string Name { get; set; }
        public Guid BuildingId { get; set; }

        [JsonIgnore]
        public ICollection<Area> Areas { get; set; }
        public List<Guid> AreasIds
        {
            get
            {
                return Areas == null ? new List<Guid>() : Areas.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public ICollection<Map> Maps { get; set; }
        public List<Guid> MapsIds
        {
            get
            {
                return Maps == null ? new List<Guid>() : Maps.Select(x => x.Id).ToList();
            }
        }
    }
}
