using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class GenericTask : Entity
    {
        public string Ref { get; set; }
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public Period Period { get; set; }
        public TaskStatus Status { get; set; }
        public Guid PriorityId { get; set; }
        public Guid FormatId { get; set; }
        public Guid CategoryId { get; set; }
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
