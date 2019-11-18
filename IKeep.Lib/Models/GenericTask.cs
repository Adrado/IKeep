﻿using IKeep.Lib.Core;
using IKeep.Lib.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class GenericTask : Entity
    {
        public string Ref { get; set; }
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public Period Period { get; set; }
        public Guid PriorityId { get; set; }
        [JsonIgnore]
        public virtual Priority Priority { get; set; }

        public string PriorityName
        {
            get
            {
                return Priority == null ? "" : Priority.Name;
            }
        }
        public Guid FormatId { get; set; }
        [JsonIgnore]
        public virtual Format Format { get; set; }

        public string FormatName
        {
            get
            {
                return Format == null ? "" : Format.Name;
            }
        }

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
        public virtual ICollection<Task> Tasks { get; set; }
        public List<Guid> TasksIds
        {
            get
            {
                return Tasks == null ? new List<Guid>() : Tasks.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<GenericElementGenericTask> GenericElementGenericTasks { get; set; }
        public List<Guid> GenericElementGenericTasksIds
        {
            get
            {
                return GenericElementGenericTasks == null ? new List<Guid>() : GenericElementGenericTasks.Select(x => x.Id).ToList();
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
