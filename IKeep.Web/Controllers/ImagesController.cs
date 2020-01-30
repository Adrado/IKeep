//using IKeep.Lib.Services.Interfaces;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace IKeep.Web.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ImagesController : ControllerBase
//    {
//        private readonly IUserImageService _userImagesService;
//        public ImagesController(IUserImageService userImagesService)
//        {
//            _userImagesService = userImagesService;
//        }

//        [HttpPost]
//        public async Task<string> Post([FromBody] string input)
//        {
//            return await Task.Run(() =>
//            {
//                return _userImagesService.HashImage(input);
//            });
//        }
//    }
//}

////No se ha implementado esta solución, sería bueno revisarlo.
////https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef