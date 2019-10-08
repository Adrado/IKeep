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
    public class InstallationsController : ControllerBase
    {
        private readonly IKeepContext _context;

        public InstallationsController(IKeepContext context)
        {
            _context = context;
        }

        // GET: api/Installations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Installation>>> GetInstallations()
        {
            return await _context.Installations.ToListAsync();
        }

        // GET: api/Installations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Installation>> GetInstallation(Guid id)
        {
            var installation = await _context.Installations.FindAsync(id);

            if (installation == null)
            {
                return NotFound();
            }

            return installation;
        }

        // PUT: api/Installations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInstallation(Guid id, Installation installation)
        {
            if (id != installation.Id)
            {
                return BadRequest();
            }

            _context.Entry(installation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstallationExists(id))
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

        // POST: api/Installations
        [HttpPost]
        public async Task<ActionResult<Installation>> PostInstallation(Installation installation)
        {
            _context.Installations.Add(installation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInstallation", new { id = installation.Id }, installation);
        }

        // DELETE: api/Installations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Installation>> DeleteInstallation(Guid id)
        {
            var installation = await _context.Installations.FindAsync(id);
            if (installation == null)
            {
                return NotFound();
            }

            _context.Installations.Remove(installation);
            await _context.SaveChangesAsync();

            return installation;
        }

        private bool InstallationExists(Guid id)
        {
            return _context.Installations.Any(e => e.Id == id);
        }
    }
}
