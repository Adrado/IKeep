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
using IKeep.Lib.Services.Interfaces;
using IKeep.Lib.Services.Dtos;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChoresController : ControllerBase
    {
        private readonly IChoreService _choresService;

        public ChoresController(IChoreService choresService)
        {
            _choresService = choresService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chore>>> GetChores()
        {
            return await _choresService.GetAll().ToListAsync();
        }

        

        // POST: api/Chores
        [HttpPost]
        public async Task<ActionResult<NewChoresResponse>> PostChore(NewChoresRequest newChoresRequest)
        {
            return await Task.Run(() =>
            {
                var output = _choresService.AddChores(newChoresRequest);
                return new ActionResult<NewChoresResponse>(output);
            });
        }

    }
}