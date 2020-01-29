using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using IKeep.Lib.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IKeep.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MultimediaController : ControllerBase
    {
        private readonly IMultimediaService _multimediaService;
        public MultimediaController(IMultimediaService multimediaService)
        {
            _multimediaService = multimediaService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MultimediaDto>>> GetFloorMaps(Guid id)
        {
            return await Task.Run(() =>
            {
                var output = _multimediaService.GetAllMaps(id);
                if (output == null)
                {
                    return NotFound();
                }
                return new ActionResult<IEnumerable<MultimediaDto>>(output);
            });
        }
        [HttpPost]
        public async Task<ActionResult<Record>> AddMultimedia(MultimediaDto dto)
        {
            return await Task.Run(() =>
            {
                var output = _multimediaService.Add(dto);
                return new ActionResult<Record>(output);
            });
        }
    }
}
