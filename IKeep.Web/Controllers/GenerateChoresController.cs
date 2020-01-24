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
    public class GenerateChoresController : ControllerBase
    {
        private readonly IGenerateChoresService _generateChoresService;

        public GenerateChoresController(IGenerateChoresService generateChoresService)
        {
            _generateChoresService = generateChoresService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chore>>> GetChores()
        {
            return await _generateChoresService.GetAll().ToListAsync();
        }

        

        // POST: api/Chores
        [HttpPost]
        public async Task<ActionResult<GenerateChoresResponse>> CreateChores(GenerateChoresRequest newChoresRequest)
        {
            return await Task.Run(() =>
            {
                var output = _generateChoresService.AddChores(newChoresRequest);
                return new ActionResult<GenerateChoresResponse>(output);
            });
        }

    }
}