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
            var choresFiltered = TotalFiltered(totalChores);
            var choresByElementList = GetChoresByElement(choresFiltered);
            GetChoresByTypeAndPeriod(choresByElementList);
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


        public List<List<Chore>> TotalFiltered(List<Chore> totalChores)
        {
            var filtered = totalChores
                .GroupBy(x => new { x.Type, x.Period, x.Element.Name})
                .Select(grp => grp.ToList())
                .ToList();

            return filtered;
        }

        private List<ChoresByElement> GetChoresByElement(List<List<Chore>> filtered)
        {
            List<ChoresByElement> choresByElementList = new List<ChoresByElement>();
            foreach (List<Chore> chores in filtered)
            {
                ChoresByElement choresByElement = new ChoresByElement()
                {
                    ElementName = chores.First().Element.Name,
                    Period = chores.First().Period,
                    ChoreTypeName = chores.First().Type,
                    NumChores = chores.Count(),
                    Chores = chores,
                };
                choresByElementList.Add(choresByElement);
            }
            return choresByElementList;
        }
        private void GetChoresByTypeAndPeriod(List<ChoresByElement> choresByElementsList)
        {

            var response = choresByElementsList
                .GroupBy(x => new { x.Period, x.ChoreTypeName })
                .Select(grp => grp.ToList())
                .ToList();

            foreach(List<ChoresByElement> list in response)
            {
                ChoresByTypeAndPeriod choresByTypeAndPeriod = new ChoresByTypeAndPeriod()
                {
                    Period = list.First().Period,
                    ChoreTypeName = list.First().ChoreTypeName,
                    numChores = list.Sum(x => x.NumChores),
                    TypeAndPeriodChores = list,
                };
                PreventiveMaintenanceData.TableData.Add(choresByTypeAndPeriod);
            }
        }
    }
}
