using IKeep.Lib.Core;
using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Server.Services
{
    public class TreeViewService
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

        public ActionResult Index()
        {
            var model = GetData();
            return model;
        }

        //private readonly IKeepContext _context;
        //public TreeViewService(IKeepContext context)
        //{
        //    _context = context;
        //}

        //public Installation[] GetData()
        //{
        //    List<Installation> items = new List<Installation>();
        //    items.AddRange(from node in _context.Installations.OfType<Building>().Where((x) => x.Id == Installation.Id)
        //                   select node.Tag as Installation);

        //    tvData.Nodes.OfType<TreeNode>()
        //                .ForEach((x => items.AddRange(from item in x.Nodes.OfType<TreeNode>()
        //                                                            .Where((y) => y.Checked)
        //                                              select item.Tag as MyClass)));

        //    return items.ToArray();
        //}



        //public override IQueryable<Installation> GetAll()
        //{

        //    return base.GetAll();
        //}

        //https://ole.michelsen.dk/blog/mapping-relational-table-data-to-a-tree-structure-in-mvc.html
    }
}
