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
                    ElementTypeId = Guid.Parse("6c43d040-366b-4b59-9002-137766065632"),
                    Name = "Elemento",
                };

                var b = new GenericElement
                {
                    Id = Guid.Parse("0112a310-89ca-49aa-b57b-3236b51d0cc4"),
                    ElementTypeId = Guid.Parse("65a98a08-d37d-40b3-b36b-14be08456b7f"),
                    Name = "Legionela",
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
