using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Corrective : Entity
    {
        public CorrectiveStatus Status { get; set; }
        public string OpeningDescription { get; set; }
        public DateTime OpeningDate { get; set; }
        public string OpenedBy { get; set; }
        public string ClosingDescription { get; set; }
        public DateTime ClosingDate { get; set; }
        public string ClosedBy { get; set; }
        public TimeSpan Duration { get; set; }
        public Guid GenericElementId { get; set; }
        // Vigilar si será nullable
        public Guid? UserId { get; set; }
        public Guid? SupplierId { get; set; }
    }

    public enum CorrectiveStatus
    {
        Opened,
        InProgress,
        Closed,
        Assigned
    }
}
