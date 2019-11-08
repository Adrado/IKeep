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
    public class GenericElementsController : ControllerBase
    {
        private readonly ICrudService<GenericElement> _genericElementsService;

        public GenericElementsController(ICrudService<GenericElement> genericElementsService)
        {
            _genericElementsService = genericElementsService;
        }

        // GET: api/GenericElements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenericElement>>> GetGenericElements()
        {
            var x = _genericElementsService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new GenericElement
                {
                    Id = Guid.Parse("72589b7d-8434-4891-a26f-8df530a3e913"),
                    ElementTypeId = Guid.Parse("c57057d2-0802-4522-95a2-0b20cabfcaeb"),
                    Name = "Caldera",
                };

                var b = new GenericElement
                {
                    Id = Guid.Parse("0112a310-89ca-49aa-b57b-3236b51d0cc4"),
                    ElementTypeId = Guid.Parse("9cdbc1c0-a419-4117-af42-30b289c50a67"),
                    Name = "Ordenador",
                };
                _genericElementsService.Add(a);
                _genericElementsService.Add(b);
            }

            return await _genericElementsService.GetAll().ToListAsync();
        }

        // GET: api/GenericElements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GenericElement>> GetGenericElement(Guid id)
        {
            return await Task.Run(() =>
            {
                var genericElement = _genericElementsService.GetAll().FirstOrDefault(x => x.Id == id);
                if (genericElement == null)
                {
                    return NotFound();
                }
                return new ActionResult<GenericElement>(genericElement);
            });
        }

        // PUT: api/GenericElements/5
        [HttpPut]
        public async Task<ActionResult<GenericElement>> PutGenericElement(GenericElement genericElement)
        {
            return await Task.Run(() =>
            {
                var output = _genericElementsService.Update(genericElement);
                return new ActionResult<GenericElement>(output);
            });
        }

        // POST: api/GenericElements
        [HttpPost]
        public async Task<ActionResult<GenericElement>> PostGenericElement(GenericElement genericElement)
        {
            return await Task.Run(() =>
            {
                var output = _genericElementsService.Add(genericElement);
                return new ActionResult<GenericElement>(output);
            });
        }

        // DELETE: api/GenericElements/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteGenericElement(Guid id)
        {
            return await Task.Run(() =>
            {
                return _genericElementsService.Delete(id);
            });
        }
    }
}
