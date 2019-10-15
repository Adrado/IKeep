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
    public class AreasController : ControllerBase
    {
        private readonly ICrudService<Area> _areasService;

        public AreasController(ICrudService<Area> areasService)
        {
            _areasService = areasService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Area>>> GetAreas()
        {
            var x = _areasService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new Area
                {
                    Id = Guid.Parse("60e7806c-dc43-4ff9-8f7b-b18b97d0ec0f"),
                    FloorId = Guid.Parse("de579db4-6927-479c-824a-a3fb20031f39"),
                    Ref = "I1",
                    Name = "MT-BCN",
                    Description = "asdjklñqwe"
                };

                var b = new Area
                {
                    Id = Guid.Parse("fdb3bb2c-adc0-4692-865c-7dbc7aa1c97f"),
                    FloorId = Guid.Parse("0433bd95-532f-43f5-ab33-994f613b7530"),
                    Ref = "I2",
                    Name = "MA",
                    Description = "yurtuyjhfgj"
                };
                _areasService.Add(a);
                _areasService.Add(b);
            }

            return await _areasService.GetAll().ToListAsync();
        }

        // GET: api/Areas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Area>> GetArea(Guid id)
        {
            return await Task.Run(() =>
            {
                var area = _areasService.GetAll().FirstOrDefault(x => x.Id == id);
                if (area == null)
                {
                    return NotFound();
                }
                return new ActionResult<Area>(area);
            });
        }

        // PUT: api/Areas/5
        [HttpPut]
        public async Task<ActionResult<Area>> PutArea(Area area)
        {
            return await Task.Run(() =>
            {
                var output = _areasService.Update(area);
                return new ActionResult<Area>(output);
            });
        }

        // POST: api/Areas
        [HttpPost]
        public async Task<ActionResult<Area>> PostArea(Area area)
        {
            return await Task.Run(() =>
            {
                var output = _areasService.Add(area);
                return new ActionResult<Area>(output);
            });
        }

        // DELETE: api/Areas/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteArea(Guid id)
        {
            return await Task.Run(() =>
            {
                return _areasService.Delete(id);
            });
        }
    }
}