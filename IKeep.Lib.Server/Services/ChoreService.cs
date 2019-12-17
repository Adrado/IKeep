using IKeep.Lib.Core;
using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using IKeep.Lib.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Server.Services
{
    public class ChoreService : IChoreService
    {
        // private readonly ICrudService<Chore> _tasksService;
        // private readonly ICrudService<Installation> _installationsService;
        // private readonly ICrudService<Building> _buildingsService;
        // private readonly ICrudService<Floor> _floorsService;
        // private readonly ICrudService<Area> _areasService;
        // private readonly ICrudEntity<Element> _elementsService;
        private readonly ICrudService<Chore> _choresService;
        private readonly IKeepContext _context;

        public ChoreService(
            //ICrudService<Installation> installationsService,
            //ICrudService<Building> buildingsService,
            //ICrudService<Floor> floorsService,
            //ICrudService<Area> areasService,
            //ICrudEntity<Element> elementsService,
            IKeepContext context,
            ICrudService<Chore> choreService
            )
        {
            //_installationsService = installationsService;
            //_buildingsService = buildingsService;
            // _floorsService = floorsService;
            //_areasService = areasService;
            // _elementsService = elementsService;
            _choresService = choreService;
            _context = context;
        }

        public IQueryable<Chore> GetAll()
        {
            return _context.Chores;
        }

        public bool AddChores(NewChoresRequest newChoresRequest)
        {
            bool response = false;
            IEnumerable<Element> elements;

            elements = GetElements(newChoresRequest);
            response = AddChoreToElements(elements, newChoresRequest.Year);

            return response;
        }

        private IEnumerable<Element> GetElements(NewChoresRequest newChoresRequest)
        {
            IEnumerable<Element> elements = new List<Element>();

            if (newChoresRequest.InstallationId != null)
                elements = GetInstallationElements(newChoresRequest.InstallationId);
            else if (newChoresRequest.BuildingId != null)
                elements = GetBuildingElements(newChoresRequest.BuildingId);
            else if (newChoresRequest.FloorId != null)
                elements = GetFloorElements(newChoresRequest.FloorId);
            else if (newChoresRequest.AreaId != null)
                elements = GetAreaElements(newChoresRequest.AreaId);

            return elements;
        }
        private IEnumerable<Element> GetInstallationElements(Guid? installationId)
        {
            var elements = new List<Element>();
            elements = (from Installation in _context.Installations
                        where Installation.Id == installationId
                        from Building in Installation.Buildings
                        from Floor in Building.Floors
                        from Area in Floor.Areas
                        from Element in Area.Elements
                        select Element).ToList();

            return elements;
        }

        private IEnumerable<Element> GetBuildingElements(Guid? buildingId)
        {
            var elements = new List<Element>();
            elements = (from Building in _context.Buildings
                        where Building.Id == buildingId
                        from Floor in Building.Floors
                        from Area in Floor.Areas
                        from Element in Area.Elements
                        select Element).ToList();
            return elements;
        }

        private IEnumerable<Element> GetFloorElements(Guid? floorId)
        {
            var elements = new List<Element>();
            elements = (from Floor in _context.Floors
                        where Floor.Id == floorId
                        from Area in Floor.Areas
                        from Element in Area.Elements
                        select Element).ToList();
            return elements;
        }

        private IEnumerable<Element> GetAreaElements(Guid? areaId)
        {
            var elements = new List<Element>();
            elements = (from Area in _context.Areas
                        where Area.Id == areaId
                        from Element in Area.Elements
                        select Element).ToList();
            return elements;
        }


        private bool AddChoreToElements(IEnumerable<Element> elements, int year)
        {
            foreach (Element element in elements)
            {
                AddElementChores(element, year);
            }

            return true;
        }

        private void AddElementChores(Element element, int year)
        {
            var elementGenericChores = element.ElementGenericChores;
            foreach (ElementGenericChore elemenGChore in elementGenericChores)
            {
                GenericChore gChore = elemenGChore.GenericChore;
                Period gChorePeriod = gChore.Period;
                Chore Chore = GetLastChore(element.Id, gChore.Id, year);
                if (Chore == null)
                    StartAddingElements(element.Id, gChore, gChorePeriod, year);
                else
                    ContinueAddingElements();
            }
        }

        private Chore GetLastChore(Guid elementId, Guid gChoreId, int year)
        {
            Chore lastChore;
            lastChore = _context.Chores
                        .Where(c => c.GenericChoreId == gChoreId && c.ElementId == elementId && c.StartDate.Year == year)
                        .OrderByDescending(c => c.StartDate)
                        .FirstOrDefault();

            return lastChore;
        }

        private void StartAddingElements(Guid elementId, GenericChore gChore, Period period, int year)
        {
            DateTime StartDate = new DateTime(year, 1, 1, 0, 0, 0);
            DateTime EndDate = new DateTime(year, 12, 31, 23, 59, 59);

            switch (period)
            {
                case Period.Daily:
                    AddDailyChore(elementId, gChore, StartDate, EndDate);
                    break;

                case Period.Weekly:
                    int firstMonday = FirstMonday(StartDate.Year);
                    DateTime FirstMondayOfTheYear = new DateTime(StartDate.Year, 1, firstMonday, 0, 0, 0);
                    AddWeeklyChore(elementId, gChore, FirstMondayOfTheYear, EndDate);
                    break;

                case Period.Monthly:
                    AddMonthlyChore(elementId, gChore, StartDate, EndDate);
                    break;

                case Period.Bimonthly:
                    AddBimonthlyChore();
                    break;

                case Period.Quarterly:
                    AddQuarterlyChore();
                    break;

                case Period.Semester:
                    AddSemesterChore();
                    break;

                case Period.TwoYearly:
                    AddTwoYearlyChore();
                    break;

                case Period.FourYearly:
                    AddFourYearlyChore();
                    break;
            }
        }

        private int FirstMonday(int year)
        {
            int day = 0;

            while ((new DateTime(year, 01, ++day)).DayOfWeek != DayOfWeek.Monday) ;

            return day;
        }

        private void ContinueAddingElements()
        {

        }

        private void AddDailyChore(Guid elementId, GenericChore gChore, DateTime startDate, DateTime endDate)
        {
            for (DateTime d = startDate; d <= endDate; d = d.AddDays(1))
            {
                Chore Chore = new Chore();
                Chore.ElementId = elementId;
                Chore.StartDate = d;
                Chore.EndDate = new DateTime(d.Year, d.Month, d.Day, 23, 59, 59);
                Chore.GenericChoreId = gChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
            }
        }

        private void AddWeeklyChore(Guid elementId, GenericChore gChore, DateTime startDate, DateTime endDate)
        {
            for (DateTime d = startDate; d <= endDate; d = d.AddDays(7))
            {
                Chore Chore = new Chore();
                Chore.ElementId = elementId;
                Chore.StartDate = d;
                Chore.EndDate = d.AddDays(6.99);
                Chore.GenericChoreId = gChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
            }
        }

        private void AddMonthlyChore(Guid elementId, GenericChore gChore, DateTime startDate, DateTime endDate)
        {
            for (DateTime d = startDate; d <= endDate; d = d.AddMonths(1))
            {
                var 
                Chore Chore = new Chore();
                Chore.ElementId = elementId;
                Chore.StartDate = d;
                Chore.EndDate = d.AddDays(6.99);
                Chore.GenericChoreId = gChore.Id;
                Chore.Status = 0;

                _choresService.Add(Chore);
            }
        }

        private void AddBimonthlyChore()
        {

        }
        private void AddQuarterlyChore()
        {

        }
        private void AddSemesterChore()
        {

        }

        private void AddTwoYearlyChore()
        {

        }

        private void AddFourYearlyChore()
        {

        }

        //private bool AddNewTask(Element element, GenericChore genericChore, DateTime prevDate)
        //{
        //    Chore chore = new Chore();
        //    chore.ElementId = element.Id;
        //    chore.StartDate = prevDate.AddDays(1);
        //    chore.EndDate = chore.StartDate.AddDays(1);
        //    chore.GenericChoreId = genericChore.Id;
        //    _choresService.Add(chore);
        //    return true;
        //}


    }
}

       

//using (var db = _context)
//{

//var installation = db.Installations.Where(i => i.Id == installationId).FirstOrDefault();
//var hola = installation.Buildings.SelectMany(building => building.Floors).SelectMany(floor => floor.Areas).SelectMany(area => area.Elements); ;
//var FullInstallation = db.Installations
//    .Where(i => i.Id == installationId)
//    .Include(i => i.Buildings)
//    .ThenInclude(b => b.Floors)
//    .ThenInclude(f => f.Areas)
//    .ThenInclude(a => a.Elements)
//    .ThenInclude(e => e.Chores)
//    .ToList();

//var FullInstallation = db.Installations
//    .Where(i => i.Id == installationId)
//    .Include(i => i.Buildings)
//    .ThenInclude(b => b.Floors)
//    .ThenInclude(f => f.Areas)
//    .ThenInclude(a => a.Elements)

//    .ToList();