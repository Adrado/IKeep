using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Report : Entity
    {
        //Vigilar el nombre del campo
        public string PDF { get; set; }
        public Guid InstallationId { get; set; }
    }
}
