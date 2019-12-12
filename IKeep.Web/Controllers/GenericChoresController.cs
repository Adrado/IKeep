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
    public class GenericTasksController : ControllerBase
    {
        private readonly ICrudService<GenericChore> _genericChoresService;

        public GenericTasksController(ICrudService<GenericChore> genericChoresService)
        {
            _genericChoresService = genericChoresService;
        }

        // GET: api/GenericTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenericChore>>> GetGenericChores()
        {
            var x = _genericChoresService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new GenericChore
                {
                    Id = Guid.Parse("4d84fb9e-14f8-40a5-8ab8-2a62c172ab22"),
                    Description = "Limpiar filtros",
                    Duration = TimeSpan.Zero,
                    PriorityId = Guid.Parse("137d2d2c-f24c-40fd-842e-e055ef9433d7"),
                    FormatId = Guid.Parse("5d92c825-6671-42a1-8852-df35f9280cc7"),
                    CategoryId = Guid.Parse("7bd26acc-8e68-45e6-bc9d-17ef00e69f4a"),
                };

                var b = new GenericChore
                {
                    Id = Guid.Parse("19b0720a-aba5-4566-bd2e-53dcf08baa08"),
                    Description = "Limpieza general",
                    Duration = TimeSpan.Zero,
                    PriorityId = Guid.Parse("d522d22b-641c-4d8c-bf36-b30343d9955d"),
                    FormatId = Guid.Parse("bfd48d51-ba58-4f68-a610-753067d9aa5e"),
                    CategoryId = Guid.Parse("a1537944-006c-4144-974a-3aaf9719518e"),
                };
                _genericChoresService.Add(a);
                _genericChoresService.Add(b);
            }

            return await _genericChoresService.GetAll().ToListAsync();
        }

        // GET: api/GenericTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GenericChore>> GetGenericChore(Guid id)
        {
            return await Task.Run(() =>
            {
                var genericTask = _genericChoresService.GetAll().FirstOrDefault(x => x.Id == id);
                if (genericTask == null)
                {
                    return NotFound();
                }
                return new ActionResult<GenericChore>(genericTask);
            });
        }

        // PUT: api/GenericTasks/5
        [HttpPut]
        public async Task<ActionResult<GenericChore>> PutGenericChore(GenericChore genericTask)
        {
            return await Task.Run(() =>
            {
                var output = _genericChoresService.Update(genericTask);
                return new ActionResult<GenericChore>(output);
            });
        }

        // POST: api/GenericTasks
        [HttpPost]
        public async Task<ActionResult<GenericChore>> PostGenericChore(GenericChore genericTask)
        {
            return await Task.Run(() =>
            {
                var output = _genericChoresService.Add(genericTask);
                return new ActionResult<GenericChore>(output);
            });
        }

        // DELETE: api/GenericTasks/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteGenericChore(Guid id)
        {
            return await Task.Run(() =>
            {
                return _genericChoresService.Delete(id);
            });
        }
    }
}