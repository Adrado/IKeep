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
    public class PrioritiesController : ControllerBase
    {
        private readonly ICrudService<Priority> _prioritiesService;

        public PrioritiesController(ICrudService<Priority> prioritiesService)
        {
            _prioritiesService = prioritiesService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Priority>>> GetPriorities()
        {
            var x = _prioritiesService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new Priority
                {
                    Id = Guid.Parse("137d2d2c-f24c-40fd-842e-e055ef9433d7"),
                    Name = "RITE1",
                };

                var b = new Priority
                {
                    Id = Guid.Parse("d522d22b-641c-4d8c-bf36-b30343d9955d"),
                    Name = "Ronda de apertura",
                };
                _prioritiesService.Add(a);
                _prioritiesService.Add(b);
            }

            return await _prioritiesService.GetAll().ToListAsync();
        }

        // GET: api/Priorities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Priority>> GetPriority(Guid id)
        {
            return await Task.Run(() =>
            {
                var priority = _prioritiesService.GetAll().FirstOrDefault(x => x.Id == id);
                if (priority == null)
                {
                    return NotFound();
                }
                return new ActionResult<Priority>(priority);
            });
        }

        // PUT: api/Priorities/5
        [HttpPut]
        public async Task<ActionResult<Priority>> PutPriority(Priority priority)
        {
            return await Task.Run(() =>
            {
                var output = _prioritiesService.Update(priority);
                return new ActionResult<Priority>(output);
            });
        }

        // POST: api/Priorities
        [HttpPost]
        public async Task<ActionResult<Priority>> PostPriority(Priority priority)
        {
            return await Task.Run(() =>
            {
                var output = _prioritiesService.Add(priority);
                return new ActionResult<Priority>(output);
            });
        }

        // DELETE: api/Priorities/5
        [HttpDelete("{id}")]
        public async Task<bool> DeletePriority(Guid id)
        {
            return await Task.Run(() =>
            {
                return _prioritiesService.Delete(id);
            });
        }
    }
}