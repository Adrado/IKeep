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

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericElementGenericChoresController : ControllerBase
    {
        private readonly ICrudService<GenericElementGenericChore> _genericElementGenericChoresService;

        public GenericElementGenericChoresController(ICrudService<GenericElementGenericChore> genericElementGenericChoresService)
        {
            _genericElementGenericChoresService = genericElementGenericChoresService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenericElementGenericChore>>> GetGenericElementGenericTasks()
        {
            var x = _genericElementGenericChoresService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new GenericElementGenericChore
                {
                    Id = Guid.Parse("4dd0bf98-917b-4a3e-9777-10f2220236ea"),
                    GenericElementId = Guid.Parse("0112a310-89ca-49aa-b57b-3236b51d0cc4"),
                    GenericChoreId = Guid.Parse("4d84fb9e-14f8-40a5-8ab8-2a62c172ab22"),
                    Status = Status.Active
                };

                var b = new GenericElementGenericChore
                {
                    Id = Guid.Parse("796fccb6-aecd-41ee-b5ac-6bb1e3eda7c9"),
                    GenericElementId = Guid.Parse("72589b7d-8434-4891-a26f-8df530a3e913"),
                    GenericChoreId = Guid.Parse("19b0720a-aba5-4566-bd2e-53dcf08baa08"),
                    Status = Status.Active,
                };
                _genericElementGenericChoresService.Add(a);
                _genericElementGenericChoresService.Add(b);
            }

            return await _genericElementGenericChoresService.GetAll().ToListAsync();
        }

        // GET: api/GenericElementGenericTasks/5
        [HttpGet("{genericElementId}")]
        public async Task<ActionResult<IEnumerable<GenericElementGenericChore>>> GetGenericElementGenericTask(Guid genericElementId)
        {
            return await _genericElementGenericChoresService.GetAll().Where(x => x.GenericElementId == genericElementId).ToListAsync();
        }

        // PUT: api/GenericElementGenericTasks/5
        [HttpPut]
        public async Task<ActionResult<GenericElementGenericChore>> PutGenericElementGenericTask(GenericElementGenericChore genericElementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _genericElementGenericChoresService.Update(genericElementGenericTask);
                return new ActionResult<GenericElementGenericChore>(output);
            });
        }

        // POST: api/GenericElementGenericTasks
        [HttpPost]
        public async Task<ActionResult<GenericElementGenericChore>> PostGenericElementGenericTask(GenericElementGenericChore genericElementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _genericElementGenericChoresService.Add(genericElementGenericTask);
                return new ActionResult<GenericElementGenericChore>(output);
            });
        }

        // DELETE: api/GenericElementGenericTasks/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteGenericElementGenericTask(Guid id)
        {
            return await Task.Run(() =>
            {
                return _genericElementGenericChoresService.Delete(id);
            });
        }
    }
}