using IKeep.Lib.Core;
using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Interfaces
{
    public interface IGetElementsService : IGenericService
    {
        IEnumerable<Element> GetInstallationElements(Guid? installationId);
        IEnumerable<Element> GetBuildingElements(Guid? buildingId);
        IEnumerable<Element> GetFloorElements(Guid? floorId);
        IEnumerable<Element> GetAreaElements(Guid? areaId);

    }
}
