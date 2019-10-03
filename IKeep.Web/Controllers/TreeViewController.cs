using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IKeep.Lib.Core;
using IKeep.Lib.Services;
using IKeep.Lib.Services.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreeViewController : ControllerBase
    {
        ITreeViewService _treeViewService { get; set; }

        public TreeViewController(ITreeViewService treeViewService)
        {
            _treeViewService = treeViewService;
        }

        // POST: api/Login
        [HttpGet]
        public async Task<User> Post([FromBody] LoginRequest loginRequest)
        {
            return await Task.Run(() =>
            {
                return _loginService.Authenticate(loginRequest);
            });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            return await _rolesService.GetAll().ToListAsync();
        }
    }
}


//https://codereview.stackexchange.com/questions/166762/a-complex-selection-linq-query