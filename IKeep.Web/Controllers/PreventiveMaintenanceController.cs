﻿using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using IKeep.Lib.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreventiveMaintenanceController : ControllerBase
    {
        private readonly IPreventiveMaintenanceService _preventiveMaintenanceService;
        public PreventiveMaintenanceController(IPreventiveMaintenanceService preventiveMaintenanceService)
        {
            _preventiveMaintenanceService = preventiveMaintenanceService;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Chore>>> GetTodayChores(MaintenanceRequest request)
        {
            return await Task.Run(() =>
            {
                var output = _preventiveMaintenanceService.GetCurrentChoresForToday(request);
                return new ActionResult<IEnumerable<Chore>>(output);
            });
        }
    }
}