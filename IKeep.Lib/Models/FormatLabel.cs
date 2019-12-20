using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class FormatLabel : Entity
    {
        public string Name { get; set; }
        public string Extension { get; set; }
        [JsonIgnore]
        public virtual ICollection<FormatValue> FormatValues { get; set; }
        [JsonIgnore]
        public virtual ICollection<GenericChoreFormatLabel> GenericChoreFormatLabels { get; set; }
    }
}
