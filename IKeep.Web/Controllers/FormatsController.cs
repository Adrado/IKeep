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
    public class FormatsController : ControllerBase
    {
        private readonly ICrudService<Format> _formatsService;

        public FormatsController(ICrudService<Format> formatsService)
        {
            _formatsService = formatsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Format>>> GetFormats()
        {
            var x = _formatsService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new Format
                {
                    Id = Guid.Parse("5d92c825-6671-42a1-8852-df35f9280cc7"),
                    Name = "Temperatura",
                };

                var b = new Format
                {
                    Id = Guid.Parse("bfd48d51-ba58-4f68-a610-753067d9aa5e"),
                    Name = "Presión",
                };
                _formatsService.Add(a);
                _formatsService.Add(b);
            }

            return await _formatsService.GetAll().ToListAsync();
        }

        // GET: api/Formats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Format>> GetFormat(Guid id)
        {
            return await Task.Run(() =>
            {
                var format = _formatsService.GetAll().FirstOrDefault(x => x.Id == id);
                if (format == null)
                {
                    return NotFound();
                }
                return new ActionResult<Format>(format);
            });
        }

        // PUT: api/Formats/5
        [HttpPut]
        public async Task<ActionResult<Format>> PutFormat(Format format)
        {
            return await Task.Run(() =>
            {
                var output = _formatsService.Update(format);
                return new ActionResult<Format>(output);
            });
        }

        // POST: api/Formats
        [HttpPost]
        public async Task<ActionResult<Format>> PostFormat(Format format)
        {
            return await Task.Run(() =>
            {
                var output = _formatsService.Add(format);
                return new ActionResult<Format>(output);
            });
        }

        // DELETE: api/Formats/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteFormat(Guid id)
        {
            return await Task.Run(() =>
            {
                return _formatsService.Delete(id);
            });
        }
    }
}