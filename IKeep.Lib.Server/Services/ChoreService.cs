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
        //private readonly ICrudService<Building> _buildingsService;
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

        public IEnumerable<Installation> AddChoresToInstallation(Guid installationId)
        {
            var installation = new List<Installation>();
            using(var db = _context)
            {
                var elements = new List<Element>();
                var FullInstallation = db.Installations
                    .Where(i => i.Id == installationId)
                    .Include(i => i.Buildings)
                    .ThenInclude(b => b.Floors)
                    .ThenInclude(f => f.Areas)
                    .ThenInclude(a => a.Elements)
                    .ThenInclude(e => e.Chores)
                    .ToList();

                installation = FullInstallation;
            }
            return installation;
        }

        private bool AddNewTask(Element element, GenericChore genericChore, DateTime prevDate)
        {
            Chore chore = new Chore();
            chore.ElementId = element.Id;
            chore.StartDate = prevDate.AddDays(1);
            chore.EndDate = chore.StartDate.AddDays(1);
            chore.GenericChoreId = genericChore.Id;

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
