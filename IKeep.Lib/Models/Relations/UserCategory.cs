﻿using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class UserCategory : Entity
    {
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
