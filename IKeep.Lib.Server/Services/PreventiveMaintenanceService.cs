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
    public class PreventiveMaintenanceService : IPreventiveMaintenanceService
    {
        private readonly ICrudService<Chore> _choresService;
        public PreventiveMaintenanceService(ICrudService<Chore> choresService)
        {
            _choresService = choresService;
        }

        public List<Chore> GetCurrentChoresForToday(MaintenanceRequest request)
        {
            return _choresService.GetAll()
                .Where(c => c.Element.Area.Floor.Building.Installation.Id == request.InstallationId 
                && DateTime.Compare(c.StartDate, request.Date) <= 0 
                && DateTime.Compare(c.EndDate, request.Date) >= 0)
                .ToList();
        }

        //List<Chore> todayChores = GetCurrentChores(allChores, request.Date);

        //private List<Chore> GetCurrentChores(List<Chore> chores, DateTime date)
        //{
        //    return chores.Where(c => DateTime.Compare(c.StartDate, date) <= 0 && DateTime.Compare(c.EndDate, date) >= 0 ).ToList();
        //}
    }
}
