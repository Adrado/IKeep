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
    public class ElementGenericChoresController : ControllerBase
    {
        private readonly ICrudService<ElementGenericChore> _elementGenericChoresService;

        public ElementGenericChoresController(ICrudService<ElementGenericChore> elementGenericChoresService)
        {
            _elementGenericChoresService = elementGenericChoresService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ElementGenericChore>>> GetElementGenericChores()
        {
            return await _elementGenericChoresService.GetAll().ToListAsync();
        }

        // GET: api/ElementGenericTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ElementGenericChore>>> GetElementGenericChore(Guid id)
        {
            return await _elementGenericChoresService.GetAll().Where(x => x.ElementId == id).ToListAsync();
        }

        // PUT: api/ElementGenericTasks/5
        [HttpPut]
        public async Task<ActionResult<ElementGenericChore>> PutElementGenericChore(ElementGenericChore elementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _elementGenericChoresService.Update(elementGenericTask);
                return new ActionResult<ElementGenericChore>(output);
            });
        }

        // POST: api/ElementGenericTasks
        [HttpPost]
        public async Task<ActionResult<ElementGenericChore>> PostElementGenericChore(ElementGenericChore elementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _elementGenericChoresService.Add(elementGenericTask);
                return new ActionResult<ElementGenericChore>(output);
            });
        }

        // DELETE: api/ElementGenericTasks/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteElementGenericChore(Guid id)
        {
            return await Task.Run(() =>
            {
                return _elementGenericChoresService.Delete(id);
            });
        }
    }
}