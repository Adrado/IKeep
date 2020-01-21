using IKeep.Lib.Core;
using Newtonsoft.Json;
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
        [JsonIgnore]
        public virtual User OpenedUser { get; set; }
        public Guid OpenedUserId { get; set; }
        public string ClosingDescription { get; set; }
        public DateTime ClosingDate { get; set; }
        public string ClosedBy { get; set; }
        [JsonIgnore]
        public virtual User ClosedUser { get; set; }
        public Guid? ClosedUserId { get; set; }
        public TimeSpan Duration { get; set; }
        public Guid ElementId { get; set; }
        [JsonIgnore]
        public virtual Element Element { get; set; }
        public Guid? UserId { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        public Guid? SupplierId { get; set; }
        [JsonIgnore]
        public virtual Supplier Supplier { get; set; }
    }

    public enum CorrectiveStatus
    {
        Opened,
        InProgress,
        Closed,
        Assigned
    }
}
