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
using IKeep.Lib.Services.Interfaces;
using IKeep.Lib.Services.Dtos;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChoresController : ControllerBase
    {
        private readonly IChoreService _choresService;

        public ChoresController(IChoreService choresService)
        {
            _choresService = choresService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chore>>> GetChores()
        {
            return await _choresService.GetAll().ToListAsync();
        }

        [HttpGet("currentReport/")]
        public PartialReport GetCurrentReport()
        {
            return  _choresService.GetCurrentResponse();
        }

        // POST: api/Chores
        [HttpPost]
        public async Task<ActionResult<NewChoresResponse>> PostChore(NewChoresRequest newChoresRequest)
        {
            return await Task.Run(() =>
            {
                var output = _choresService.AddChores(newChoresRequest);
                return new ActionResult<NewChoresResponse>(output);
            });
        }

        

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
        //{

        //    return await _tasksService.GetAll().ToListAsync();
        //}

        //// GET: api/Tasks/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Task>> GetTask(Guid id)
        //{
        //    return await System.Threading.Tasks.Task.Run(() =>
        //    {
        //        var task = _tasksService.GetAll().FirstOrDefault(x => x.Id == id);
        //        if (task == null)
        //        {
        //            return NotFound();
        //        }
        //        return new ActionResult<Task>(task);
        //    });
        //}

        //// PUT: api/Tasks/5
        //[HttpPut]
        //public async Task<ActionResult<Task>> PutTask(Task task)
        //{
        //    return await System.Threading.Tasks.Task.Run(() =>
        //    {
        //        var output = _tasksService.Update(task);
        //        return new ActionResult<Task>(output);
        //    });
        //}



        //// DELETE: api/Tasks/5
        //[HttpDelete("{id}")]
        //public async Task<bool> DeleteTask(Guid id)
        //{
        //    return await System.Threading.Tasks.Task.Run(() =>
        //    {
        //        return _tasksService.Delete(id);
        //    });
        //}
    }
}