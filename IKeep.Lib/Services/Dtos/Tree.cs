using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class Tree
    {
        private TreeNode rootNode;
        public TreeNode RootNode
        {
            get { return rootNode; }
            set
            {
                if (RootNode != null)
                    Nodes.Remove(RootNode.Id);

                Nodes.Add(value.Id, value);
                rootNode = value;
            }
        }

        //Antes era una clase Dictionary
        public Dictionary<Guid, TreeNode> Nodes { get; set; }

        public Tree()
        {
        }

        public void BuildTree()
        {
            TreeNode parent;
            foreach (var node in Nodes.Values)
            {
                if (Nodes.TryGetValue(node.ParentId, out parent) &&
                    node.Id != node.ParentId)
                {
                    node.Parent = parent;
                    parent.Children.Add(node);
                }
            }
        }
    }
}
