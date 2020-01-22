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
    public class ElementsController : ControllerBase
    {
        private readonly ICrudService<Element> _elementsService;

        public ElementsController(ICrudService<Element> elementsService)
        {
            _elementsService = elementsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Element>>> GetElements()
        {
            return await _elementsService.GetAll().ToListAsync();
        }

        // GET: api/Elements/5
        [HttpGet("{areaId}")]
        public async Task<ActionResult<IEnumerable<Element>>> GetElementsByAreaId(Guid areaId)
        {
            return await _elementsService.GetAll().Where(x => x.AreaId == areaId).ToListAsync();
        }

        [HttpGet("genericElement/{id}")]
        public async Task<ActionResult<int>> GetElementsByGenericElementId(Guid id)
        {
            return await Task.Run(() =>
            {
                var count = _elementsService.GetAll().Where(x => x.GenericElementId == id).ToList().Count();
                return new ActionResult<int>(count);
            });  
        }

        [HttpGet("installation/{id}")]
        public async Task<ActionResult<IEnumerable<Element>>> GetInstallationElements(Guid id)
        {
            return await _elementsService.GetAll().Where(x => x.Area.Floor.Building.Installation.Id == id).ToListAsync();
            //return await Task.Run(() =>
            //{
            //    var output = _elementsService.GetAll().Where(x => x.Area.Floor.Building.Installation.Id == id).ToList();
            //    return new ActionResult<IEnumerable<Element>>(output);
            //});
        }

        // PUT: api/Elements/5
        [HttpPut]
        public async Task<ActionResult<Element>> PutElement(Element element)
        {
            return await Task.Run(() =>
            {
                var output = _elementsService.Update(element);
                return new ActionResult<Element>(output);
            });
        }

        // POST: api/Elements
        [HttpPost]
        public async Task<ActionResult<Element>> PostElement(Element element)
        {
            return await Task.Run(() =>
            {
                var output = _elementsService.Add(element);
                return new ActionResult<Element>(output);
            });
        }

        // DELETE: api/Elements/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteElement(Guid id)
        {
            return await Task.Run(() =>
            {
                return _elementsService.Delete(id);
            });
        }
    }
}