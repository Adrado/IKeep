using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class FormatValue : Entity
    {
        public string Value { get; set; }
        public Guid FormatLabelId { get; set; }
        public virtual FormatLabel FormatLabel { get; set; }
        public Guid ChoreId { get; set; }
        [JsonIgnore]
        public virtual Chore Chore { get; set; }
    }
}
