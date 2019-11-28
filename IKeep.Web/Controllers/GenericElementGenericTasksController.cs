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
using Task = System.Threading.Tasks.Task;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericElementGenericTasksController : ControllerBase
    {
        private readonly ICrudService<GenericElementGenericTask> _genericElementGenericTasksService;

        public GenericElementGenericTasksController(ICrudService<GenericElementGenericTask> genericElementGenericTasksService)
        {
            _genericElementGenericTasksService = genericElementGenericTasksService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenericElementGenericTask>>> GetGenericElementGenericTasks()
        {
            var x = _genericElementGenericTasksService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new GenericElementGenericTask
                {
                    Id = Guid.Parse("4dd0bf98-917b-4a3e-9777-10f2220236ea"),
                    GenericElementId = Guid.Parse("0112a310-89ca-49aa-b57b-3236b51d0cc4"),
                    GenericTaskId = Guid.Parse("4d84fb9e-14f8-40a5-8ab8-2a62c172ab22"),
                    Status = Status.Active
                };

                var b = new GenericElementGenericTask
                {
                    Id = Guid.Parse("796fccb6-aecd-41ee-b5ac-6bb1e3eda7c9"),
                    GenericElementId = Guid.Parse("72589b7d-8434-4891-a26f-8df530a3e913"),
                    GenericTaskId = Guid.Parse("19b0720a-aba5-4566-bd2e-53dcf08baa08"),
                    Status = Status.Active,
                };
                _genericElementGenericTasksService.Add(a);
                _genericElementGenericTasksService.Add(b);
            }

            return await _genericElementGenericTasksService.GetAll().ToListAsync();
        }

        // GET: api/GenericElementGenericTasks/5
        [HttpGet("{genericElementId}")]
        public async Task<ActionResult<IEnumerable<GenericElementGenericTask>>> GetGenericElementGenericTask(Guid genericElementId)
        {
            return await _genericElementGenericTasksService.GetAll().Where(x => x.GenericElementId == genericElementId).ToListAsync();
        }

        // PUT: api/GenericElementGenericTasks/5
        [HttpPut]
        public async Task<ActionResult<GenericElementGenericTask>> PutGenericElementGenericTask(GenericElementGenericTask genericElementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _genericElementGenericTasksService.Update(genericElementGenericTask);
                return new ActionResult<GenericElementGenericTask>(output);
            });
        }

        // POST: api/GenericElementGenericTasks
        [HttpPost]
        public async Task<ActionResult<GenericElementGenericTask>> PostGenericElementGenericTask(GenericElementGenericTask genericElementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _genericElementGenericTasksService.Add(genericElementGenericTask);
                return new ActionResult<GenericElementGenericTask>(output);
            });
        }

        // DELETE: api/GenericElementGenericTasks/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteGenericElementGenericTask(Guid id)
        {
            return await Task.Run(() =>
            {
                return _genericElementGenericTasksService.Delete(id);
            });
        }
    }
}