using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Chore : Entity
    {
        public Guid ElementId { get; set; }
        [JsonIgnore]
        public virtual Element Element { get; set; }
        public Guid? UserId { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid GenericChoreId { get; set; }
        [JsonIgnore]
        public virtual GenericChore GenericChore { get; set; }
        public string Priotity
        {
            get
            {
                return GenericChore == null ? "" : GenericChore.PriorityName;
            }
        }
        public string Category
        {
            get
            {
                return GenericChore == null ? "" : GenericChore.CategoryName;
            }
        }
        public ChoreStatus Status { get; set; }
        public virtual ICollection<FormatValue> FormatValues { get; set; }


    }
    public enum ChoreStatus
    {
        Undone,
        Done,
        ProperlyDone,
        ImproperlyDone
    }
}
