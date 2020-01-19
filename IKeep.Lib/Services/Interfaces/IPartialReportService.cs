using IKeep.Lib.Core;
using IKeep.Lib.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Interfaces
{
    public interface IPartialReportService : IGenericService
    {
        PartialReport GetPartialReport(PartialReportRequest request);
    }
}
