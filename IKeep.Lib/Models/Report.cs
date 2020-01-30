using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Report : Record
    {
        public Guid InstallationId { get; set; }
        [JsonIgnore]
        public virtual Installation Installation { get; set; }
    }
}
