﻿using System;
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
using IKeep.Lib.Services.Interfaces;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _tasksService;

        public TasksController(ITaskService tasksService)
        {
            _tasksService = tasksService;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Installation>>> GetTasks(Guid id)
        {

            return  _tasksService.AddTasksToInstallation(id);
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

        //// POST: api/Tasks
        //[HttpPost]
        //public async Task<ActionResult<Task>> PostTask(Task task)
        //{
        //    return await System.Threading.Tasks.Task.Run(() =>
        //    {
        //        var output = _tasksService.Add(task);
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