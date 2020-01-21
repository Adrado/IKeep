using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class MaintenanceRequest
    {
        public Guid InstallationId { get; set; }
        public DateTime Date { get; set; }
    }
}
