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
    public class FloorsController : ControllerBase
    {
        private readonly IKeepContext _context;

        public FloorsController(IKeepContext context)
        {
            _context = context;
        }

        // GET: api/Floors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Floor>>> GetFloors()
        {
            return await _context.Floors.ToListAsync();
        }

        // GET: api/Floors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Floor>> GetFloor(Guid id)
        {
            var floor = await _context.Floors.FindAsync(id);

            if (floor == null)
            {
                return NotFound();
            }

            return floor;
        }

        // PUT: api/Floors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFloor(Guid id, Floor floor)
        {
            if (id != floor.Id)
            {
                return BadRequest();
            }

            _context.Entry(floor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FloorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Floors
        [HttpPost]
        public async Task<ActionResult<Floor>> PostFloor(Floor floor)
        {
            _context.Floors.Add(floor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFloor", new { id = floor.Id }, floor);
        }

        // DELETE: api/Floors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Floor>> DeleteFloor(Guid id)
        {
            var floor = await _context.Floors.FindAsync(id);
            if (floor == null)
            {
                return NotFound();
            }

            _context.Floors.Remove(floor);
            await _context.SaveChangesAsync();

            return floor;
        }

        private bool FloorExists(Guid id)
        {
            return _context.Floors.Any(e => e.Id == id);
        }
    }
}
