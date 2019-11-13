using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Core
{
    public class Entity
    {
        public Guid Id { get; set; }
        public EntityStatus EntityStatus { get; set; } 
        public string EntityType
        {
            get
            {
                return GetType().Name;
            }
        }
    }

    public enum EntityStatus
    {
        Inactive,
        Active
    }
}
