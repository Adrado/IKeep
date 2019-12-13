using IKeep.Lib.Core;
using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;
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

        public IEnumerable<Element> AddChoresToInstallation(Guid installationId)
        {
            var elements = new List<Element>();
                elements = (from Installation in _context.Installations
                                                    //.Include(i => i.Buildings)
                                                    //.ThenInclude(b => b.Floors)
                                                    //.ThenInclude(f => f.Areas)
                                                    //.ThenInclude(a => a.Elements)
                            where Installation.Id == installationId
                                 from Building in Installation.Buildings
                                 from Floor in Building.Floors
                                 from Area in Floor.Areas
                                 from Element in Area.Elements
                                 select Element).ToList();

            return elements;
        }

        private void AddChores(IEnumerable<Element> elements)
        {
            foreach(Element element in elements)
            {
                AddChore(element);
            }
        }

        private void AddChore(Element element)
        {
            var elementGenericChores = element.ElementGenericChores;
            foreach(ElementGenericChore elemenGChore in elementGenericChores)
            {
                GenericChore gChore = elemenGChore.GenericChore;
                Period gChorePeriod = gChore.Period;
                AddTasks(element, gChore, gChorePeriod);
            }
        }

        private void AddTasks(Element element, GenericChore gChore, Period gChorePeriod)
        {

        }


        private IEnumerable<Element> AddChoresToBuilding(Guid buildingId)
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



        private bool AddNewTask(Element element, GenericChore genericChore, DateTime prevDate)
        {
            Chore chore = new Chore();
            chore.ElementId = element.Id;
            chore.StartDate = prevDate.AddDays(1);
            chore.EndDate = chore.StartDate.AddDays(1);
            chore.GenericChoreId = genericChore.Id;
            _choresService.Add(chore);
            return true;
        }

     


        //private void AddChores(Installation installation, Element element, Guid genericChoreId)
        //{

        //}

        //private void AddDailyChore(Element element)
        //{

        //}

        //private void AddWeeklyChore(Element element)
        //{

        //}
        //private void AddMonthlyChore(Element element)
        //{

        //}
        //private void AddBimonthlyChore(Element element)
        //{

        //}
        //private void AddQuarterlyChore(Element element)
        //{

        //}
        //private void AddSemesterChore(Element element)
        //{

        //}
        //private void AddYearlyChore(Element element)
        //{

        //}
        //private void AddTwoYearlyChore(Element element)
        //{

        //}
        //private void AddFourYearlyChore(Element element)
        //{

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