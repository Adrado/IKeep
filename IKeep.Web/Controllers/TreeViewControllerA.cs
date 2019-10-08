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
using IKeep.Lib.Services.Interfaces;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreeViewController : ControllerBase
    {
        private readonly ITreeViewService _treeViewService;

        public TreeViewController(ICrudService<TreeView> treeViewService)
        {
            _treeViewService = treeViewService;
        }

        // GET: api/TreeView
        [HttpGet]
        public async Task<ActionResult<TreeView>> GetTreeView()
        {
            return await Task.Run(() =>
            {
                var treeView = _treeViewService.GetAll();

                if (treeView == null)
                {
                    return NotFound();
                }

                return new ActionResult<TreeView>(treeView);
            });
        }

        //// GET: api/TreeView/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<TreeView>> GetTreeView(Guid id)
        //{
        //    return await Task.Run(() =>
        //    {
        //        var role = _treeViewService.GetAll().FirstOrDefault(x => x.Id == id);
        //        if (role == null)
        //        {
        //            return NotFound();
        //        }
        //        return new ActionResult<TreeView>(role);
        //    });
        //}

        //// PUT: api/TreeView/5
        //[HttpPut]
        //public async Task<ActionResult<TreeView>> PutTreeView(TreeView role)
        //{
        //    return await Task.Run(() =>
        //    {
        //        var output = _treeViewService.Update(role);
        //        return new ActionResult<TreeView>(output);
        //    });
        //}

        //// POST: api/TreeView
        //[HttpPost]
        //public async Task<ActionResult<TreeView>> PostTreeView(TreeView role)
        //{
        //    return await Task.Run(() =>
        //    {
        //        var output = _treeViewService.Add(role);
        //        return new ActionResult<TreeView>(output);
        //    });
        //}

        //// DELETE: api/TreeView/5
        //[HttpDelete("{id}")]
        //public async Task<bool> DeleteTreeView(Guid id)
        //{
        //    return await Task.Run(() =>
        //    {
        //        return _treeViewService.Delete(id);
        //    });
        //}
    }
}

