using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreeView : ControllerBase
    {
        private readonly IKeepContext _context;

        public TreeView(IKeepContext context)
        {
            _context = context;
        }

        // GET: api/Buildings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetBuildings()
        {

            //var qry = from b in dc.Blobs orderby b.RowVersion descending select new { b.Id, b.Size, b.Signature, b.RowVersion }; return qry.ToList();

            //var query = _context.Installations.AsQueryable();
            //var treeView = query.Select(w => new { w.Id, w.Name}).ToList();


            return await _context.Installations.Select(i => new { i.Id, i.Name, i.Buildings }).ToListAsync();

            //var treeView = _context.Installations.
            //return await _context.Installations.ToListAsync();


            //return _context.Installations.Select(w => new Installation()
            //   {
            //    Id = w.Id,
            //    Name = w.Name
            //}).ToListAsync(); ; 
        }

        // GET: api/Buildings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Building>> GetBuilding(Guid id)
        {
            var building = await _context.Buildings.FindAsync(id);

            if (building == null)
            {
                return NotFound();
            }

            return building;
        }
    }
}
