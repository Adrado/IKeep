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
    public class RolesController : ControllerBase
    {
        private readonly ICrudService<Role> _rolesService;

        public RolesController(ICrudService<Role> rolesService)
        {
            _rolesService = rolesService;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            return await _rolesService.GetAll().ToListAsync();
        }

        // GET: api/Roles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRole(Guid id)
        {
            return await Task.Run(() =>
            {
                var role = _rolesService.GetAll().FirstOrDefault(x => x.Id == id);
                if (role == null)
                {
                    return NotFound();
                }
                return new ActionResult<Role>(role);
            });
        }

        // PUT: api/Roles/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Role>> PutRole(Role role)
        {
            return await Task.Run(() =>
            {
                var output = _rolesService.Update(role);
                return new ActionResult<Role>(output);
            });
        }

        // POST: api/Roles
        [HttpPost]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
            return await Task.Run(() =>
            {
                var output = _rolesService.Add(role);
                return new ActionResult<Role>(output);
            });
        }

        // DELETE: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteRole(Guid id)
        {
            return await Task.Run(() =>
            {
                return _rolesService.Delete(id);
            });
        }
    }
}

