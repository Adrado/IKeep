using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Map : Record
    {
        public Guid FloorId { get; set; }
        [JsonIgnore]
        public virtual Floor Floor { get; set; }
    }
}
