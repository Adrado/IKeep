using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class NewChoresGuideline
    {
        public Guid ElementId { get; set; }
        public GenericChore GenericChore { get; set; }
        public TimeSpanToAddChores TimeSpanToAddChores { get; set; }
    }
}
