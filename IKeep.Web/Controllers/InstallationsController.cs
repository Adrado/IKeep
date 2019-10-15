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
    public class InstallationsController : ControllerBase
    {
        private readonly ICrudService<Installation> _installationsService;

        public InstallationsController(ICrudService<Installation> installationsService)
        {
            _installationsService = installationsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Installation>>> GetInstallations()
        {
            var x = _installationsService.GetAll().ToList().Count();

            if (x == 1)
            {
                var a = new Installation
                {
                    Id = Guid.Parse("d24ab749-87e9-43a9-9c7f-70d7021e5c83"),
                    Ref = "I1",
                    Name = "MT-BCN",
                    CIF = "XXXXXX",
                    CP = 1234,
                    Address = "c/Bolivia",
                    City = "Barcelona",
                    Phone = 123456789,
                    Phone2 = 987654321,
                    Fax = 1234,
                    Email = "mt@bcn.com"
                };

                var b = new Installation
                {
                    Id = Guid.Parse("ce7fa284-7452-4c0a-acd4-ffa9f2360803"),
                    Ref = "I2",
                    Name = "MA",
                    CIF = "XXXXXX",
                    CP = 45645,
                    Address = "c/Alcalá",
                    City = "Madrid",
                    Phone = 123456789,
                    Phone2 = 987654321,
                    Fax = 1234,
                    Email = "Ma@Ja.com"
                };
                _installationsService.Add(a);
                //_installationsService.Add(b);
            }

            return await _installationsService.GetAll().ToListAsync();
        }

        // GET: api/Installations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Installation>> GetInstallation(Guid id)
        {
            return await Task.Run(() =>
            {
                var installation = _installationsService.GetAll().FirstOrDefault(x => x.Id == id);
                if (installation == null)
                {
                    return NotFound();
                }
                return new ActionResult<Installation>(installation);
            });
        }

        // PUT: api/Installations/5
        [HttpPut]
        public async Task<ActionResult<Installation>> PutInstallation(Installation installation)
        {
            return await Task.Run(() =>
            {
                var output = _installationsService.Update(installation);
                return new ActionResult<Installation>(output);
            });
        }

        // POST: api/Installations
        [HttpPost]
        public async Task<ActionResult<Installation>> PostInstallation(Installation installation)
        {
            return await Task.Run(() =>
            {
                var output = _installationsService.Add(installation);
                return new ActionResult<Installation>(output);
            });
        }

        // DELETE: api/Installations/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteInstallation(Guid id)
        {
            return await Task.Run(() =>
            {
                return _installationsService.Delete(id);
            });
        }
    }
}
