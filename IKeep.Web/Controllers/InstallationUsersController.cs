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

        // GET: api/InstallationUsers/installation/Guid
        [HttpGet("installation/{id}")]
        public async Task<ActionResult<IEnumerable<InstallationUser>>> GetInstallationUsersByInstallationId(Guid id)
        {
            return await _installationUsersService.GetAll().Where(x => x.InstallationId == id).ToListAsync();
        }

        // GET: api/InstallationUsers/user/Guid
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<InstallationUser>>> GetInstallationUsersByUserId(Guid id)
        {
            return await _installationUsersService.GetAll().Where(x => x.UserId == id).ToListAsync();
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