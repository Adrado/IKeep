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
    public class ChoreTypesController : ControllerBase
    {
        private readonly ICrudService<ChoreType> _choreTypesService;

        public ChoreTypesController(ICrudService<ChoreType> choreTypesService)
        {
            _choreTypesService = choreTypesService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChoreType>>> GetPriorities()
        {
            var x = _choreTypesService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new ChoreType
                {
                    Id = Guid.Parse("137d2d2c-f24c-40fd-842e-e055ef9433d7"),
                    Name = "RITE1",
                };

                var b = new ChoreType
                {
                    Id = Guid.Parse("d522d22b-641c-4d8c-bf36-b30343d9955d"),
                    Name = "Ronda de apertura",
                };
                _choreTypesService.Add(a);
                _choreTypesService.Add(b);
            }

            return await _choreTypesService.GetAll().ToListAsync();
        }

        // GET: api/Priorities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChoreType>> GetChoreType(Guid id)
        {
            return await Task.Run(() =>
            {
                var choreType = _choreTypesService.GetAll().FirstOrDefault(x => x.Id == id);
                if (choreType == null)
                {
                    return NotFound();
                }
                return new ActionResult<ChoreType>(choreType);
            });
        }

        // PUT: api/Priorities/5
        [HttpPut]
        public async Task<ActionResult<ChoreType>> PutChoreType(ChoreType choreType)
        {
            return await Task.Run(() =>
            {
                var output = _choreTypesService.Update(choreType);
                return new ActionResult<ChoreType>(output);
            });
        }

        // POST: api/Priorities
        [HttpPost]
        public async Task<ActionResult<ChoreType>> PostChoreType(ChoreType choreType)
        {
            return await Task.Run(() =>
            {
                var output = _choreTypesService.Add(choreType);
                return new ActionResult<ChoreType>(output);
            });
        }

        // DELETE: api/Priorities/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteChoreType(Guid id)
        {
            return await Task.Run(() =>
            {
                return _choreTypesService.Delete(id);
            });
        }
    }
}