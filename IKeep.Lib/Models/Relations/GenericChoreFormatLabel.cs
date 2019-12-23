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
        [JsonIgnore]
        public virtual FormatLabel FormatLabel { get; set; }
        public string FormatName
        {
            get
            {
                return FormatLabel == null ? "" : FormatLabel.Name;
            }
        }
        public string FormatExtension
        {
            get
            {
                return FormatLabel == null ? "" : FormatLabel.Extension;
            }
        }
    }
}
