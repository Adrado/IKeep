using IKeep.Lib.Core;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using IKeep.Lib.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Server.Services
{
    public class PartialReportService : IPartialReportService
    {
        private readonly ICrudService<Chore> _choresService;
        public PartialReportService(ICrudService<Chore> choresService)
        {
            _choresService = choresService;
        }
        public PartialReport GetPartialReport(PartialReportRequest request)
        {
            PartialReport response = new PartialReport();
            response.BeforeYear = _choresService.GetAll()
                .Where(x => x.StartDate.Year == request.Year - 1 && x.Element.Area.Floor.Building.Installation.Id == request.InstallationId).Count();
            response.CurrentRequest = _choresService.GetAll()
                .Where(x => x.StartDate.Year == request.Year && x.Element.Area.Floor.Building.Installation.Id == request.InstallationId).Count();
            return response;
        }
    }
}
