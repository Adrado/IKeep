using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;
using IKeep.Lib.Core;
using IKeep.Lib.Services.Interfaces;
using IKeep.Lib.Services.Dtos;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartialReportController : ControllerBase
    {
        private readonly IPartialReportService _partialReportService;
        public PartialReportController(IPartialReportService partialReportService)
        {
            _partialReportService = partialReportService;
        }
        [HttpPost]
        public PartialReport GetCurrentReport(PartialReportRequest request)
        {
            return _partialReportService.GetPartialReport(request);
        }
    }
}
