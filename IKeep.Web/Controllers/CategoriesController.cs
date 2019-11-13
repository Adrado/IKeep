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
    public class CategoriesController : ControllerBase
    {
        private readonly ICrudService<Category> _categoriesService;

        public CategoriesController(ICrudService<Category> categoriesService)
        {
            _categoriesService = categoriesService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var x = _categoriesService.GetAll().ToList().Count();

            if (x == 0)
            {
                var a = new Category
                {
                    Id = Guid.Parse("7bd26acc-8e68-45e6-bc9d-17ef00e69f4a"),
                    Name = "Mantenimiento",

                };

                var b = new Category
                {
                    Id = Guid.Parse("a1537944-006c-4144-974a-3aaf9719518e"),
                    Name = "Oficinas",
                };
                _categoriesService.Add(a);
                _categoriesService.Add(b);
            }

            return await _categoriesService.GetAll().ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(Guid id)
        {
            return await Task.Run(() =>
            {
                var category = _categoriesService.GetAll().FirstOrDefault(x => x.Id == id);
                if (category == null)
                {
                    return NotFound();
                }
                return new ActionResult<Category>(category);
            });
        }

        // PUT: api/Categories/5
        [HttpPut]
        public async Task<ActionResult<Category>> PutCategory(Category category)
        {
            return await Task.Run(() =>
            {
                var output = _categoriesService.Update(category);
                return new ActionResult<Category>(output);
            });
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            return await Task.Run(() =>
            {
                var output = _categoriesService.Add(category);
                return new ActionResult<Category>(output);
            });
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteCategory(Guid id)
        {
            return await Task.Run(() =>
            {
                return _categoriesService.Delete(id);
            });
        }
    }
}