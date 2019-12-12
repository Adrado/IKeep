using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class GenericElementGenericChore : Entity
    {
        public Guid GenericElementId { get; set; }
        [JsonIgnore]
        public virtual GenericElement GenericElement { get; set; }

        public string GenericElementName
        {
            get
            {
                return GenericElement == null ? "" : GenericElement.Name;
            }
        }
        public Guid GenericChoreId { get; set; }
        [JsonIgnore]
        public virtual GenericChore GenericChore { get; set; }
        public string GenericTaskDescription
        {
            get
            {
                return GenericChore == null ? "" : GenericChore.Description;
            }
        }
        public Status Status { get; set; }
    }

    public enum Status
    {
        Inactive,
        Active
    }
}
