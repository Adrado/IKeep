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
        public string Description
        {
            get
            {
                return GenericChore == null ? "" : GenericChore.Description;
            }
        }
        public string Type
        {
            get
            {
                return GenericChore == null ? "" : GenericChore.ChoreTypeName;
            }
        }
        public string Category
        {
            get
            {
                return GenericChore == null ? "" : GenericChore.CategoryName;
            }
        }
        public Period Period
        {
            get
            {
                // Refactor Period.DEFAULT
                return GenericChore == null ? Period.DEFAULT : GenericChore.Period;
            }
        }
        public Priority Priority
        {
            get
            {
                // Refactor Priority.DEFAULT
                return GenericChore == null ? Priority.DEFAULT : GenericChore.Priority;
            }
        }

        public TimeSpan Duration
        {
            get
            {
                return GenericChore == null ? TimeSpan.Zero : GenericChore.Duration;
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
