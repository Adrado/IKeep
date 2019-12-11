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
    public class TaskService : ITaskService
    {
       // private readonly ICrudService<Task> _tasksService;
        private readonly ICrudService<Installation> _installationsService;
        private readonly ICrudService<Building> _buildingsService;
        private readonly ICrudService<Floor> _floorsService;
        private readonly ICrudService<Area> _areasService;
        private readonly ICrudEntity<Element> _elementsService;
        private readonly IKeepContext _context;

        public TaskService(
            ICrudService<Installation> installationsService,
            ICrudService<Building> buildingsService,
            ICrudService<Floor> floorsService,
            ICrudService<Area> areasService,
            ICrudEntity<Element> elementsService,
            IKeepContext context
            )
        {
            _installationsService = installationsService;
            _buildingsService = buildingsService;
            _floorsService = floorsService;
            _areasService = areasService;
            _elementsService = elementsService;
            _context = context;
        }

        IEnumerable<Installation> AddTasksToInstallation(Guid installationId)
        {
            var installation = new List<Installation>();
            using(var db = _context)
            {
                 installation = db.Installations
                    .Where(i =>i.Id == installationId)
                    .Include(i => i.Buildings)
                    .ThenInclude(b => b.Floors)
                    .ThenInclude(f => f.Areas)
                    .ThenInclude(a => a.Elements)
                    .ToList();

            }
            return installation;
        }

        //private void AddTasks(Installation installation, Element element, Guid genericTaskId)
        //{

        //}

        //private void AddDailyTask(Element element)
        //{

        //}

        //private void AddWeeklyTask(Element element)
        //{

        //}
        //private void AddMonthlyTask(Element element)
        //{

        //}
        //private void AddBimonthlyTask(Element element)
        //{

        //}
        //private void AddQuarterlyTask(Element element)
        //{

        //}
        //private void AddSemesterTask(Element element)
        //{

        //}
        //private void AddYearlyTask(Element element)
        //{

        //}
        //private void AddTwoYearlyTask(Element element)
        //{

        //}
        //private void AddFourYearlyTask(Element element)
        //{

        //}
    }
}
