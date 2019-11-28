using IKeep.Lib.Core;
using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using IKeep.Lib.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Server.Services
{
    public class TreeViewService : ITreeViewService
    {
        private readonly IKeepContext _context;

        public TreeViewService(IKeepContext context)
        {
            _context = context;
        }

        private Tree GetData()
        {
            var tree = new Tree();

            using (var db = _context)
            {
                var installations = db.Installations
                    .Select(t => new TreeNode { Id = t.Id, ParentId = Guid.Parse("ccf9fd7d-4d91-4599-b156-4e6e3f4b1e22"), Name = t.Name, Type = t.EntityType })
                    .ToDictionary(t => t.Id);

                var buildings = db.Buildings
                    .Select(t => new TreeNode { Id = t.Id, ParentId = t.InstallationId, Name = t.Name, Type = t.EntityType })
                    .ToDictionary(t => t.Id);
                
                var floors = db.Floors
                    .Select(t => new TreeNode { Id = t.Id, ParentId = t.BuildingId, Name = t.Name, Type = t.EntityType })
                    .ToDictionary(t => t.Id);
                
                var areas = db.Areas
                    .Select(t => new TreeNode { Id = t.Id, ParentId = t.FloorId, Name = t.Name, Type = t.EntityType })
                    .ToDictionary(t => t.Id);

                tree.Nodes = installations.Union(buildings).Union(floors).Union(areas).ToDictionary(k => k.Key, v => v.Value);

                tree.RootNode = new TreeNode { Id = Guid.Parse("ccf9fd7d-4d91-4599-b156-4e6e3f4b1e22"), Name = "Root" };

                tree.SortTree();
                // Build the tree, setting parent and children references for all elements
                tree.BuildTree();
            }

            return tree;
        }

        public Tree GetTreeView()
        {
            var tree = GetData();
            return tree;
        }

        //https://ole.michelsen.dk/blog/mapping-relational-table-data-to-a-tree-structure-in-mvc.html
    }
}
