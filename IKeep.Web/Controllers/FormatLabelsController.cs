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
    public class FormatLabelsController : ControllerBase
    {
        private readonly ICrudService<FormatLabel> _formatLabelsService;

        public FormatLabelsController(ICrudService<FormatLabel> formatLabelsService)
        {
            _formatLabelsService = formatLabelsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormatLabel>>> GetFormats()
        {
            var x = _formatLabelsService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new FormatLabel
                {
                    Id = Guid.Parse("5d92c825-6671-42a1-8852-df35f9280cc7"),
                    Name = "Temperatura",
                };

                var b = new FormatLabel
                {
                    Id = Guid.Parse("bfd48d51-ba58-4f68-a610-753067d9aa5e"),
                    Name = "Presión",
                };
                _formatLabelsService.Add(a);
                _formatLabelsService.Add(b);
            }

            return await _formatLabelsService.GetAll().ToListAsync();
        }

        // GET: api/Formats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FormatLabel>> GetFormat(Guid id)
        {
            return await Task.Run(() =>
            {
                var format = _formatLabelsService.GetAll().FirstOrDefault(x => x.Id == id);
                if (format == null)
                {
                    return NotFound();
                }
                return new ActionResult<FormatLabel>(format);
            });
        }

        // PUT: api/Formats/5
        [HttpPut]
        public async Task<ActionResult<FormatLabel>> PutFormat(FormatLabel format)
        {
            return await Task.Run(() =>
            {
                var output = _formatLabelsService.Update(format);
                return new ActionResult<FormatLabel>(output);
            });
        }

        // POST: api/Formats
        [HttpPost]
        public async Task<ActionResult<FormatLabel>> PostFormat(FormatLabel format)
        {
            return await Task.Run(() =>
            {
                var output = _formatLabelsService.Add(format);
                return new ActionResult<FormatLabel>(output);
            });
        }

        // DELETE: api/Formats/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteFormat(Guid id)
        {
            return await Task.Run(() =>
            {
                return _formatLabelsService.Delete(id);
            });
        }
    }
}