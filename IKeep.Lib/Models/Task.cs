using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Task : Entity
    {
        public string Ref { get; set; }
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public Period Period { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public TaskStatus Status { get; set; }
        public Guid GenericElementId { get; set; }
        public Guid PriorityId { get; set; }
        public Guid FormatId { get; set; }
        public Guid CategoryId { get; set; }

        //Vigilar si son nullables
        public Guid? SupplierId { get; set; }
        public Guid? UserId { get; set; }
    
        
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

    public enum TaskStatus
    {
        Inactive,
        Active
    }
}
