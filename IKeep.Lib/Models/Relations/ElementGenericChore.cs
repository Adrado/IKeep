using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class ElementGenericChore : Entity
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
        public Guid GenericChoreId { get; set; }
        [JsonIgnore]
        public virtual GenericChore GenericChore { get; set; }
        public string GenericChoreDescription
        {
            get
            {
                return GenericChore == null ? "" : GenericChore.Description;
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