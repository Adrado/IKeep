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
    public class ElementTypesController : ControllerBase
    {
        private readonly ICrudService<ElementType> _elementTypesService;

        public ElementTypesController(ICrudService<ElementType> elementTypesService)
        {
            _elementTypesService = elementTypesService;
        }

        // GET: api/ElementTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ElementType>>> GetElementTypes()
        {
            var x = _elementTypesService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new ElementType
                {
                    Id = Guid.Parse("9cdbc1c0-a419-4117-af42-30b289c50a67"),
                    Ref = "1",
                    Name = "Elemento",
                };

                var b = new ElementType
                {
                    Id = Guid.Parse("c57057d2-0802-4522-95a2-0b20cabfcaeb"),
                    Ref = "2",
                    Name = "Legionela",
                };
                _elementTypesService.Add(a);
                _elementTypesService.Add(b);
            }

            return await _elementTypesService.GetAll().ToListAsync();
        }

        // GET: api/ElementTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ElementType>> GetElementType(Guid id)
        {
            return await Task.Run(() =>
            {
                var elementType = _elementTypesService.GetAll().FirstOrDefault(x => x.Id == id);
                if (elementType == null)
                {
                    return NotFound();
                }
                return new ActionResult<ElementType>(elementType);
            });
        }

        // PUT: api/ElementTypes/5
        [HttpPut]
        public async Task<ActionResult<ElementType>> PutElementType(ElementType elementType)
        {
            return await Task.Run(() =>
            {
                var output = _elementTypesService.Update(elementType);
                return new ActionResult<ElementType>(output);
            });
        }

        // POST: api/ElementTypes
        [HttpPost]
        public async Task<ActionResult<ElementType>> PostElementType(ElementType elementType)
        {
            return await Task.Run(() =>
            {
                var output = _elementTypesService.Add(elementType);
                return new ActionResult<ElementType>(output);
            });
        }

        // DELETE: api/ElementTypes/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteElementType(Guid id)
        {
            return await Task.Run(() =>
            {
                return _elementTypesService.Delete(id);
            });
        }
    }
}
