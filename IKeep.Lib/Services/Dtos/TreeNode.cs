using IKeep.Lib.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;


namespace IKeep.Lib.Services.Dtos
{
    public class TreeNode 
    {

        public Guid Id;

        [JsonIgnore]
        public Guid ParentId;

        [JsonIgnore]
        public TreeNode Parent;

        public string Name;

        public List<TreeNode> Children;
    }
}
