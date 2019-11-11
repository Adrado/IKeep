using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class InstallationUser : Entity
    {
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public Guid InstallationId { get; set; }
        public virtual Installation Installation { get; set; }
    }
}
