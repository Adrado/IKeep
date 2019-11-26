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
    public class UsersController : ControllerBase
    {
        private readonly ICrudService<User> _usersService;

        public UsersController(ICrudService<User> usersService)
        {
            _usersService = usersService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _usersService.GetAll().ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            return await Task.Run(() =>
            {
                var user = _usersService.GetAll().FirstOrDefault(x => x.Id == id);
                if (user == null)
                {
                    return NotFound();
                }
                return new ActionResult<User>(user);
            });
        }

        // PUT: api/Users/5
        [HttpPut]
        public async Task<ActionResult<User>> PutUser(User user)
        {
            return await Task.Run(() =>
            {
                var output = _usersService.Update(user);
                return new ActionResult<User>(output);
            });
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            return await Task.Run(() =>
            {
                var output = _usersService.Add(user);
                return new ActionResult<User>(output);
            });
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteUser(Guid id)
        {
            return await Task.Run(() =>
            {
                return _usersService.Delete(id);
            });
        }
    }
}
