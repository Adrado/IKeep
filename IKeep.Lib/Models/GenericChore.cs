using IKeep.Lib.Core;
using IKeep.Lib.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class GenericChore : Entity
    {
        public string Ref { get; set; }
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public Period Period { get; set; }
        public Guid PriorityId { get; set; }
        [JsonIgnore]
        public virtual Priority Priority { get; set; }
        public Guid? SupplierId { get; set; }
        [JsonIgnore]
        public virtual Supplier Supplier { get; set; }

        public string PriorityName
        {
            get
            {
                return Priority == null ? "" : Priority.Name;
            }
        }

        public virtual ICollection<GenericChoreFormatLabel> GenericChoreFormatLabels { get; set; }

        public Guid CategoryId { get; set; }
        [JsonIgnore]
        public virtual Category Category { get; set; }

        public string CategoryName
        {
            get
            {
                return Category == null ? "" : Category.Name;
            }
        }

        [JsonIgnore]
        public virtual ICollection<Chore> Chores { get; set; }
        [JsonIgnore]
        public List<Guid> ChoresIds
        {
            get
            {
                return Chores == null ? new List<Guid>() : Chores.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<GenericElementGenericChore> GenericElementGenericChores { get; set; }
        public List<Guid> GenericElementGenericChoresIds
        {
            get
            {
                return GenericElementGenericChores == null ? new List<Guid>() : GenericElementGenericChores.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<ElementGenericChore> ElementGenericChores { get; set; }
        public List<Guid> ElementGenericTasksIds
        {
            get
            {
                return ElementGenericChores == null ? new List<Guid>() : ElementGenericChores.Select(x => x.Id).ToList();
            }
        }
    }

    public enum Period
    {
        Daily,
        Weekly,
        Monthly,
        Bimonthly,
        Quarterly,
        Semester,
        Yearly,
        TwoYearly,
        FourYearly
    }

}
