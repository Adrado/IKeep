using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IKeep.Lib.Core;

namespace IKeep.Lib.Server.Services
{
    public class GetElementsService : IGetElementsService
    {
        
        private readonly IKeepContext _context;

        public GetElementsService(IKeepContext context)
        {
            
            _context = context;
        }

        public IEnumerable<Element> GetInstallationElements(Guid? installationId)
        {
            var elements = new List<Element>();
            elements = (from Installation in _context.Installations
                        where Installation.Id == installationId
                        from Building in Installation.Buildings
                        from Floor in Building.Floors
                        from Area in Floor.Areas
                        from Element in Area.Elements
                        select Element).ToList();

            return elements;
        }

        public IEnumerable<Element> GetBuildingElements(Guid? buildingId)
        {
            var elements = new List<Element>();
            elements = (from Building in _context.Buildings
                        where Building.Id == buildingId
                        from Floor in Building.Floors
                        from Area in Floor.Areas
                        from Element in Area.Elements
                        select Element).ToList();
            return elements;
        }

        public IEnumerable<Element> GetFloorElements(Guid? floorId)
        {
            var elements = new List<Element>();
            elements = (from Floor in _context.Floors
                        where Floor.Id == floorId
                        from Area in Floor.Areas
                        from Element in Area.Elements
                        select Element).ToList();
            return elements;
        }

        public IEnumerable<Element> GetAreaElements(Guid? areaId)
        {
            var elements = new List<Element>();
            elements = (from Area in _context.Areas
                        where Area.Id == areaId
                        from Element in Area.Elements
                        select Element).ToList();
            return elements;
        }

        public IEnumerable<Installation> GetAllActiveInstallations()
        {
            var installations = new List<Installation>();
            installations = _context.Installations.Where(i => i.EntityStatus == EntityStatus.Active).ToList();
            return installations;
        }
    }
}
