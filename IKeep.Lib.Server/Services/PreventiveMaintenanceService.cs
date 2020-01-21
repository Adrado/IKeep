using IKeep.Lib.Core;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Server.Services
{
    public class PreventiveMaintenanceService : IPreventiveMaintenanceService
    {
        private readonly ICrudService<Chore> _choresService;
        public PreventiveMaintenanceService(ICrudService<Chore> choresService)
        {
            _choresService = choresService;
        }

        public GetCurrentChoresForToday()
    }
}
