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
using IKeep.Lib.Server.Services;
using IKeep.Lib.Services.Dtos;
using IKeep.Lib.Services.Interfaces;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreeViewController : ControllerBase
    {
        private readonly ITreeViewService _treeViewService;

        public TreeViewController(ITreeViewService treeViewService)
        {
            _treeViewService = treeViewService;
        }

        // GET: api/TreeView
        [HttpGet]
        public async Task<ActionResult<Tree>> GetTreeView()
        {
            return await Task.Run(() =>
            {
                var treeView = _treeViewService.GetTreeView();

                if (treeView == null)
                {
                    return NotFound();
                }

                return new ActionResult<Tree>(treeView);
            });
        }
    }
}

