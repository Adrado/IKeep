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


namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericChoreFormatLabelsController : ControllerBase
    {
        private readonly ICrudService<GenericChoreFormatLabel> _genericChoreFormatLabelsService;

        public GenericChoreFormatLabelsController(ICrudService<GenericChoreFormatLabel> genericChoreFormatLabelsService)
        {
            _genericChoreFormatLabelsService = genericChoreFormatLabelsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenericChoreFormatLabel>>> GetGenericChoreFormatLabels()
        {
            return await _genericChoreFormatLabelsService.GetAll().ToListAsync();
        }

        // GET: api/ElementGenericTasks/5
        [HttpGet("{gChoreId}")]
        public async Task<ActionResult<IEnumerable<GenericChoreFormatLabel>>> GetGenericChoreFormatLabel(Guid gChoreId)
        {
            return await _genericChoreFormatLabelsService.GetAll().Where(x => x.GenericChoreId == gChoreId).ToListAsync();
        }

        // PUT: api/ElementGenericTasks/5
        [HttpPut]
        public async Task<ActionResult<GenericChoreFormatLabel>> PutGenericChoreFormatLabel(GenericChoreFormatLabel elementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _genericChoreFormatLabelsService.Update(elementGenericTask);
                return new ActionResult<GenericChoreFormatLabel>(output);
            });
        }

        // POST: api/ElementGenericTasks
        [HttpPost]
        public async Task<ActionResult<GenericChoreFormatLabel>> PostGenericChoreFormatLabel(GenericChoreFormatLabel elementGenericTask)
        {
            return await Task.Run(() =>
            {
                var output = _genericChoreFormatLabelsService.Add(elementGenericTask);
                return new ActionResult<GenericChoreFormatLabel>(output);
            });
        }

        // DELETE: api/ElementGenericTasks/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteGenericChoreFormatLabel(Guid id)
        {
            return await Task.Run(() =>
            {
                return _genericChoreFormatLabelsService.Delete(id);
            });
        }
    }
}