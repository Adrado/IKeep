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
            //var x = _elementsService.GetAll().ToList().Count();

            //if (x == 0)
            //{
            //    var a = new Element
            //    {
            //        Id = Guid.Parse("60e7806c-dc43-4ff9-8f7b-b18b97d0ec0f"),
            //        FloorId = Guid.Parse("de579db4-6927-479c-824a-a3fb20031f39"),
            //        Ref = "I1",
            //        Name = "MT-BCN",
            //        Description = "asdjklñqwe"
            //    };

            //    var b = new Element
            //    {
            //        Id = Guid.Parse("fdb3bb2c-adc0-4692-865c-7dbc7aa1c97f"),
            //        FloorId = Guid.Parse("0433bd95-532f-43f5-ab33-994f613b7530"),
            //        Ref = "I2",
            //        Name = "MA",
            //        Description = "yurtuyjhfgj"
            //    };
            //    _elementsService.Add(a);
            //    _elementsService.Add(b);
            //}

            return await _elementsService.GetAll().ToListAsync();
        }

        // GET: api/Elements/5
        [HttpGet("{areaId}")]
        public async Task<ActionResult<IEnumerable<Element>>> GetElementsByAreaId(Guid areaId)
        {
            return await _elementsService.GetAll().Where(x => x.AreaId == areaId).ToListAsync();
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