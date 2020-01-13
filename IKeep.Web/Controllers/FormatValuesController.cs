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
    public class FormatValuesController : ControllerBase
    {
        private readonly ICrudService<FormatValue> _formatValuesService;

        public FormatValuesController(ICrudService<FormatValue> formatValuesService)
        {
            _formatValuesService = formatValuesService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormatValue>>> GetFormats()
        {
            return await _formatValuesService.GetAll().ToListAsync();
        }

        // GET: api/Formats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FormatValue>> GetFormat(Guid id)
        {
            return await Task.Run(() =>
            {
                var format = _formatValuesService.GetAll().FirstOrDefault(x => x.Id == id);
                if (format == null)
                {
                    return NotFound();
                }
                return new ActionResult<FormatValue>(format);
            });
        }

        // PUT: api/Formats/5
        [HttpPut]
        public async Task<ActionResult<FormatValue>> PutFormat(FormatValue format)
        {
            return await Task.Run(() =>
            {
                var output = _formatValuesService.Update(format);
                return new ActionResult<FormatValue>(output);
            });
        }

        // POST: api/Formats
        [HttpPost]
        public async Task<ActionResult<FormatValue>> PostFormat(FormatValue format)
        {
            return await Task.Run(() =>
            {
                var output = _formatValuesService.Add(format);
                return new ActionResult<FormatValue>(output);
            });
        }

        // DELETE: api/Formats/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteFormat(Guid id)
        {
            return await Task.Run(() =>
            {
                return _formatValuesService.Delete(id);
            });
        }
    }
}