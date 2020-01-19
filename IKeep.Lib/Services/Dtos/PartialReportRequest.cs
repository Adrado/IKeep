using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class PartialReportRequest
    {
        public int Year { get; set; }
        public Guid InstallationId { get; set; }
    }
}
