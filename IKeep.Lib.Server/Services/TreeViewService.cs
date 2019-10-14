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
                // Add each element as a tree node
                tree.Nodes = db.Buildings
                    .Select(t => new TreeNode { Id = t.Id, ParentId = t.InstallationId, Name = t.Name })
                    .ToDictionary(t => t.Id);


                // Create a new root node
                tree.RootNode = new TreeNode { Id = Guid.NewGuid(), Name = "Root" };

                // Build the tree, setting parent and children references for all elements
                tree.BuildTree();
            }

            return tree;
        }

        public Tree GetTreeView()
        {
            var model = GetData();
            return model;
        }

        //https://ole.michelsen.dk/blog/mapping-relational-table-data-to-a-tree-structure-in-mvc.html
    }
}
