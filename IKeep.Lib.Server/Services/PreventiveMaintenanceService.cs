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
        private readonly ICrudService<Element> _elementsService;
        public PreventiveMaintenanceService(ICrudService<Chore> choresService,
                                            ICrudService<Element> elementsService)
        {
            _choresService = choresService;
            _elementsService = elementsService;
        }

        public PreventiveMaintenanceData PreventiveMaintenanceData { get; set; }


        public PreventiveMaintenanceData GetDataToTable(MaintenanceRequest request)
        {
            PreventiveMaintenanceData = new PreventiveMaintenanceData();
            List<Chore> totalChores = GetCurrentChoresForToday(request);
            var totalFiltered = TotalFiltered(totalChores);
            var typeAndPeriodFiltered = GetChoresByTypeAndPeriod(totalFiltered);
            GetChoresByTypeAndPeriod(typeAndPeriodFiltered);

            return PreventiveMaintenanceData;
        }

        private List<Chore> GetCurrentChoresForToday(MaintenanceRequest request)
        {
            return _choresService.GetAll()
                .Where(c => c.Element.Area.Floor.Building.Installation.Id == request.InstallationId
                && (DateTime.Compare(c.StartDate, request.Date) <= 0
                && DateTime.Compare(c.EndDate, request.Date) >= 0))
                .ToList();
        }

        public List<ChoresByTypePeriodAndElement> TotalFiltered(List<Chore> totalChores)
        {
            var totalFiltered = totalChores
                .GroupBy(x => new { x.Type, x.Period, x.Element.Name })
                .Select(grp =>
                new ChoresByTypePeriodAndElement
                {
                    Period = grp.First().Period,
                    ChoreTypeName = grp.First().Type,
                    ElementName = grp.First().Element.Name,
                    NumChores = grp.Count(),
                    Chores = grp.ToList()
                })
                .ToList();

            return totalFiltered;
        }

        private List<ChoresByTypeAndPeriod> GetChoresByTypeAndPeriod(List<ChoresByTypePeriodAndElement> totalFiltered)
        {
            var filteredByTypeAndPeriod = totalFiltered
                .GroupBy(x => new { x.Period, x.ChoreTypeName })
                .Select(grp => 
                new ChoresByTypeAndPeriod
                {
                    Period = grp.First().Period,
                    ChoreTypeName = grp.First().ChoreTypeName,
                    numChores = grp.Sum(x => x.NumChores),
                    TotalFilteredList = grp.ToList()
                })
                .ToList();

            return filteredByTypeAndPeriod;
        }

        private void GetChoresByTypeAndPeriod(List<ChoresByTypeAndPeriod> choresByTypeAndPeriod)
        {
            PreventiveMaintenanceData.TableData = choresByTypeAndPeriod
                .GroupBy(x => new { x.ChoreTypeName })
                .Select(grp =>
                new ChoresByType
                {
                    ChoreTypeName = grp.First().ChoreTypeName,
                    ChoresByTypeAndPeriod = grp.ToList(),
                })
                .ToList();
        }
    }
}
