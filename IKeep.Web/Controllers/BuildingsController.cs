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
    public class BuildingsController : ControllerBase
    {
        private readonly ICrudService<Building> _buildingsService;

        public BuildingsController(ICrudService<Building> buildingsService)
        {
            _buildingsService = buildingsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Building>>> GetBuildings()
        {
            var x = _buildingsService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new Building
                {
                    Id = Guid.Parse("a0b03150-18b2-4c80-aea0-d615983d8dd6"),
                    InstallationId = Guid.Parse("d24ab749-87e9-43a9-9c7f-70d7021e5c83"),
                    Ref = "B1",
                    Name = "Oficinas",
                    Description = "qwerty",
                };

                var b = new Building
                {
                    Id = Guid.Parse("a23fdd96-9fd3-4e28-b48a-ee4f237d2fef"),
                    InstallationId = Guid.Parse("ce7fa284-7452-4c0a-acd4-ffa9f2360803"),
                    Ref = "B1",
                    Name = "Paz",
                    Description = "Lorem ipsum"

                };
                _buildingsService.Add(a);
                _buildingsService.Add(b);
            }

            return await _buildingsService.GetAll().ToListAsync();
        }

        // GET: api/Buildings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Building>> GetBuilding(Guid id)
        {
            return await Task.Run(() =>
            {
                var building = _buildingsService.GetAll().FirstOrDefault(x => x.Id == id);
                if (building == null)
                {
                    return NotFound();
                }
                return new ActionResult<Building>(building);
            });
        }

        [HttpGet("installation/{id}")]
        public async Task<ActionResult<IEnumerable<Building>>> GetBuildingsOfInstallation(Guid id)
        {
             return await _buildingsService.GetAll().Where(x => x.InstallationId == id).ToListAsync();
        }

        // PUT: api/Buildings/5
        [HttpPut]
        public async Task<ActionResult<Building>> PutBuilding(Building building)
        {
            return await Task.Run(() =>
            {
                var output = _buildingsService.Update(building);
                return new ActionResult<Building>(output);
            });
        }

        // POST: api/Buildings
        [HttpPost]
        public async Task<ActionResult<Building>> PostBuilding(Building building)
        {
            return await Task.Run(() =>
            {
                var output = _buildingsService.Add(building);
                return new ActionResult<Building>(output);
            });
        }

        // DELETE: api/Buildings/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteBuilding(Guid id)
        {
            return await Task.Run(() =>
            {
                return _buildingsService.Delete(id);
            });
        }
    }
}