using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class GenericChoreFormatLabel : Entity
    {
        public Guid GenericChoreId { get; set; }
        [JsonIgnore]
        public virtual GenericChore GenericChore { get; set; }
        public Guid FormatLabelId { get; set; }
        public virtual FormatLabel FormatLabel { get; set; }
    }
}
