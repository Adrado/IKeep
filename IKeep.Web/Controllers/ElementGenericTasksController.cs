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
    public class ElementGenericTasksController : ControllerBase
    {
        private readonly ICrudService<ElementGenericTask> _elementGenericTasksService;

        public ElementGenericTasksController(ICrudService<ElementGenericTask> elementGenericTasksService)
        {
            _elementGenericTasksService = elementGenericTasksService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ElementGenericTask>>> GetElementGenericTasks()
        {
            //var x = _elementGenericTasksService.GetAll().ToList().Count();

            //if (x == 0)
            //{
            //    var a = new ElementGenericTask
            //    {
            //        Id = Guid.Parse("4dd0bf98-917b-4a3e-9777-10f2220236ea"),
            //        GenericElementId = Guid.Parse("0112a310-89ca-49aa-b57b-3236b51d0cc4"),
            //        GenericTaskId = Guid.Parse("4d84fb9e-14f8-40a5-8ab8-2a62c172ab22"),
            //        Status = Status.Active
            //    };

            //    var b = new ElementGenericTask
            //    {
            //        Id = Guid.Parse("796fccb6-aecd-41ee-b5ac-6bb1e3eda7c9"),
            //        GenericElementId = Guid.Parse("72589b7d-8434-4891-a26f-8df530a3e913"),
            //        GenericTaskId = Guid.Parse("19b0720a-aba5-4566-bd2e-53dcf08baa08"),
            //        Status = Status.Active,
            //    };
            //    _elementGenericTasksService.Add(a);
            //    _elementGenericTasksService.Add(b);
            //}

            return await _elementGenericTasksService.GetAll().ToListAsync();
        }

        // GET: api/ElementGenericTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ElementGenericTask>>> GetElementGenericTask(Guid id)
        {
            return await _elementGenericTasksService.GetAll().Where(x => x.ElementId == id).ToListAsync();
        }

        // PUT: api/ElementGenericTasks/5
        [HttpPut]
        public async Task<ActionResult<ElementGenericTask>> PutElementGenericTask(ElementGenericTask elementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _elementGenericTasksService.Update(elementGenericTask);
                return new ActionResult<ElementGenericTask>(output);
            });
        }

        // POST: api/ElementGenericTasks
        [HttpPost]
        public async Task<ActionResult<ElementGenericTask>> PostElementGenericTask(ElementGenericTask elementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _elementGenericTasksService.Add(elementGenericTask);
                return new ActionResult<ElementGenericTask>(output);
            });
        }

        // DELETE: api/ElementGenericTasks/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteElementGenericTask(Guid id)
        {
            return await Task.Run(() =>
            {
                return _elementGenericTasksService.Delete(id);
            });
        }
    }
}