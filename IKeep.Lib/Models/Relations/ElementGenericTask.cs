using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class ElementGenericTask : Entity
    {
        public Guid ElementId { get; set; }
        [JsonIgnore]
        public virtual Element Element { get; set; }

        public string ElementName
        {
            get
            {
                return Element == null ? "" : Element.Name;
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

    //public enum Status
    //{
    //    Inactive,
    //    Active
    //}
}