﻿using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Inspection : Entity
    {
        public DateTime Date { get; set; }
        //vigilar el tipo del campo Result
        public string Result { get; set; }
        public Guid InstallationId { get; set; }
        [JsonIgnore]
        public virtual Installation Installation { get; set; }
    }
}
