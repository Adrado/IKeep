using IKeep.Lib.Core;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Interfaces
{
    public interface IMultimediaService : IGenericService
    {
        Record Add(MultimediaDto dto);
        List<MultimediaDto> GetAllMaps(Guid floorId);
    }
}
