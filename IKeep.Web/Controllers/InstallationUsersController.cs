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
    public class InstallationUsersController : ControllerBase
    {
        private readonly ICrudService<InstallationUser> _installationUsersService;

        public InstallationUsersController(ICrudService<InstallationUser> installationUsersService)
        {
            _installationUsersService = installationUsersService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InstallationUser>>> GetInstallationUsers()
        {
            return await _installationUsersService.GetAll().ToListAsync();
        }

        // GET: api/InstallationUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InstallationUser>> GetInstallationUser(Guid id)
        {
            return await Task.Run(() =>
            {
                var installationUser = _installationUsersService.GetAll().FirstOrDefault(x => x.Id == id);
                if (installationUser == null)
                {
                    return NotFound();
                }
                return new ActionResult<InstallationUser>(installationUser);
            });
        }

        // PUT: api/InstallationUsers/5
        [HttpPut]
        public async Task<ActionResult<InstallationUser>> PutInstallationUser(InstallationUser installationUser)
        {
            return await Task.Run(() =>
            {
                var output = _installationUsersService.Update(installationUser);
                return new ActionResult<InstallationUser>(output);
            });
        }

        // POST: api/InstallationUsers
        [HttpPost]
        public async Task<ActionResult<InstallationUser>> PostInstallationUser(InstallationUser installationUser)
        {
            return await Task.Run(() =>
            {
                var output = _installationUsersService.Add(installationUser);
                return new ActionResult<InstallationUser>(output);
            });
        }

        // DELETE: api/InstallationUsers/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteInstallationUser(Guid id)
        {
            return await Task.Run(() =>
            {
                return _installationUsersService.Delete(id);
            });
        }
    }
}