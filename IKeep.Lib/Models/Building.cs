using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Building : Entity
    {
        public string Ref { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid InstallationId { get; set; }
        [JsonIgnore]
        public virtual ICollection<Floor> Floors { get; set; }
        public List<Guid> FloorsIds
        {
            get
            {
                return Floors == null ? new List<Guid>() : Floors.Select(x => x.Id).ToList();
            }
        }
    }
}