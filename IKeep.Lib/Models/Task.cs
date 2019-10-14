using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Task : GenericTask
    {
        public Guid ElementId { get; set; }
        public Guid? SupplierId { get; set; }
        public Guid? UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
