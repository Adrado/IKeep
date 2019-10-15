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
    public class FloorsController : ControllerBase
    {
        private readonly ICrudService<Floor> _floorsService;

        public FloorsController(ICrudService<Floor> floorsService)
        {
            _floorsService = floorsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Floor>>> GetFloors()
        {
            var x = _floorsService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new Floor
                {
                    Id = Guid.Parse("de579db4-6927-479c-824a-a3fb20031f39"),
                    BuildingId = Guid.Parse("a0b03150-18b2-4c80-aea0-d615983d8dd6"),
                    Ref = "F1",
                    Name = "Auditoria"
                    
                };

                var b = new Floor
                {
                    Id = Guid.Parse("0433bd95-532f-43f5-ab33-994f613b7530"),
                    BuildingId = Guid.Parse("a23fdd96-9fd3-4e28-b48a-ee4f237d2fef"),
                    Ref = "F1",
                    Name = "Rosas"
                    
                };
                _floorsService.Add(a);
                _floorsService.Add(b);
            }

            return await _floorsService.GetAll().ToListAsync();
        }

        // GET: api/Floors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Floor>> GetFloor(Guid id)
        {
            return await Task.Run(() =>
            {
                var floor = _floorsService.GetAll().FirstOrDefault(x => x.Id == id);
                if (floor == null)
                {
                    return NotFound();
                }
                return new ActionResult<Floor>(floor);
            });
        }

        // PUT: api/Floors/5
        [HttpPut]
        public async Task<ActionResult<Floor>> PutFloor(Floor floor)
        {
            return await Task.Run(() =>
            {
                var output = _floorsService.Update(floor);
                return new ActionResult<Floor>(output);
            });
        }

        // POST: api/Floors
        [HttpPost]
        public async Task<ActionResult<Floor>> PostFloor(Floor floor)
        {
            return await Task.Run(() =>
            {
                var output = _floorsService.Add(floor);
                return new ActionResult<Floor>(output);
            });
        }

        // DELETE: api/Floors/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteFloor(Guid id)
        {
            return await Task.Run(() =>
            {
                return _floorsService.Delete(id);
            });
        }
    }
}
