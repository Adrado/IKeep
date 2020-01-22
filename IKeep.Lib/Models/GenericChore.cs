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
        public Priority Priority { get; set; }
        public Guid ChoreTypeId { get; set; }
        [JsonIgnore]
        public virtual ChoreType ChoreType { get; set; }
        public Guid? SupplierId { get; set; }
        [JsonIgnore]
        public virtual Supplier Supplier { get; set; }
        
        public string ChoreTypeName
        {
            get
            {
                return ChoreType == null ? "" : ChoreType.Name;
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
        FourYearly,
        DEFAULT
    }

    public enum Priority
    {
        Top,
        Average,
        Low,
        DEFAULT
    }

}
