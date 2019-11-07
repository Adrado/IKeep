﻿using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Task : Entity
    {
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public Period Period { get; set; }
        public Guid PriorityId { get; set; }
        [JsonIgnore]
        public Priority Priority { get; set; }
        public Guid FormatId { get; set; }
        [JsonIgnore]
        public Format Format { get; set; }
        public Guid CategoryId { get; set; }
        [JsonIgnore]
        public Category Category { get; set; }
        public Guid ElementId { get; set; }
        [JsonIgnore]
        public Element Element { get; set; }
        public Guid? SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public Guid? UserId { get; set; }
        public User User { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid GenericTaskId { get; set; }
        public TaskStatus Status { get; set; }
    }
    public enum TaskStatus
    {
        Inactive,
        Active
    }
}
