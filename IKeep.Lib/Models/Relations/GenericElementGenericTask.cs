using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class GenericElementGenericTask : Entity
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
        public Guid GenericTaskId { get; set; }
        [JsonIgnore]
        public virtual GenericTask GenericTask { get; set; }
        public string GenericTaskDescription
        {
            get
            {
                return GenericTask == null ? "" : GenericTask.Description;
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
