using IKeep.Lib.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Drawing;
using System.Web;
using System.Drawing.Imaging;
using IKeep.Lib.Services.Dtos;
using IKeep.Lib.Core;
using IKeep.Lib.Models;

namespace IKeep.Lib.Server.Services
{
    public class MultimediaService : IMultimediaService
    {
        private readonly ICrudService<Map> _mapsService;
        private readonly ICrudService<Floor> _floorsService;
        public MultimediaService(   ICrudService<Map> mapsService,
                                    ICrudService<Floor> floorsService)
        {
            _mapsService = mapsService;
            _floorsService = floorsService;
        }

        public Record Add(MultimediaDto dto)
        {
            var hash = HashImageAndSaveInServer(dto.Base64);
            Map map = CreateMap(hash, dto);
            return _mapsService.Add(map);
        }

        public List<MultimediaDto> GetAllMaps(Guid floorId)
        {
            var maps = _floorsService.GetAll().FirstOrDefault(x => x.Id == floorId).Maps;
            var dtos = GetImages(maps);
            return dtos;
        }
        private string HashImageAndSaveInServer(string input)
        {
            string data = input.Substring(input.IndexOf(',') + 1);

            var bytes = Convert.FromBase64String(data);

            string hash;
            using (var sha1 = new SHA1CryptoServiceProvider())
            {
                hash = Convert.ToBase64String(sha1.ComputeHash(bytes));
                hash = string.Concat(hash.ToCharArray().Where(x => char.IsLetterOrDigit(x)));
            }

            using (var ms = new MemoryStream(bytes))
            {
                var img = Image.FromStream(ms);
                img.Save("wwwroot/Multimedia/Image/Map/" + hash + ".png", ImageFormat.Png);
            }

            return hash;
        }

        private Map CreateMap(string hash, MultimediaDto dto)
        {
            Map map = new Map()
            {
                CreatedDate = DateTime.Now,
                Name = dto.Name,
                Description = dto.Description,
                FloorId = dto.ParentId,
                HashData = hash,
                Extension = "png"
            };
            return map;
        }

        private string GetBase64(string path)
        {
            using (Image image = Image.FromFile(path))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    image.Save(m, image.RawFormat);
                    byte[] imageBytes = m.ToArray();

                    // Convert byte[] to Base64 String
                    string base64String = Convert.ToBase64String(imageBytes);
                    return base64String;
                }
            }
        }

        private List<MultimediaDto> GetImages(ICollection<Map> maps)
        {
            List<MultimediaDto> DtosList = new List<MultimediaDto>();
            foreach(Map map in maps)
            {
                string path = "wwwroot/Multimedia/Image/Map/" + map.HashData + ".png";
                string base64 = GetBase64(path);
                var dto = CreateDto(map, base64);
                DtosList.Add(dto);
            }
            return DtosList;
        }

        private MultimediaDto CreateDto(Map map, string base64)
        {
            MultimediaDto dto = new MultimediaDto()
            {
                MultimediaId = map.Id,
                ParentId = map.FloorId,
                Base64 = base64,
                CreatedDate = map.CreatedDate,
                Name = map.Name,
                Description = map.Description,
            };
            return dto;
        }
    }
}
