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
using Task = IKeep.Lib.Models.Task;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ICrudService<Task> _tasksService;

        public TasksController(ICrudService<Task> tasksService)
        {
            _tasksService = tasksService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
        {
            //var x = _tasksService.GetAll().ToList().Count();

            //if (x == 0)
            //{
            //    var a = new Task
            //    {
            //        Id = Guid.Parse("60e7806c-dc43-4ff9-8f7b-b18b97d0ec0f"),
            //        FloorId = Guid.Parse("de579db4-6927-479c-824a-a3fb20031f39"),
            //        Ref = "I1",
            //        Name = "MT-BCN",
            //        Description = "asdjklñqwe"
            //    };

            //    var b = new Task
            //    {
            //        Id = Guid.Parse("fdb3bb2c-adc0-4692-865c-7dbc7aa1c97f"),
            //        FloorId = Guid.Parse("0433bd95-532f-43f5-ab33-994f613b7530"),
            //        Ref = "I2",
            //        Name = "MA",
            //        Description = "yurtuyjhfgj"
            //    };
            //    _tasksService.Add(a);
            //    _tasksService.Add(b);
            //}

            return await _tasksService.GetAll().ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(Guid id)
        {
            return await System.Threading.Tasks.Task.Run(() =>
            {
                var task = _tasksService.GetAll().FirstOrDefault(x => x.Id == id);
                if (task == null)
                {
                    return NotFound();
                }
                return new ActionResult<Task>(task);
            });
        }

        // PUT: api/Tasks/5
        [HttpPut]
        public async Task<ActionResult<Task>> PutTask(Task task)
        {
            return await System.Threading.Tasks.Task.Run(() =>
            {
                var output = _tasksService.Update(task);
                return new ActionResult<Task>(output);
            });
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<Task>> PostTask(Task task)
        {
            return await System.Threading.Tasks.Task.Run(() =>
            {
                var output = _tasksService.Add(task);
                return new ActionResult<Task>(output);
            });
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteTask(Guid id)
        {
            return await System.Threading.Tasks.Task.Run(() =>
            {
                return _tasksService.Delete(id);
            });
        }
    }
}