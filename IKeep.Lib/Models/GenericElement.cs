using IKeep.Lib.Core;
using IKeep.Lib.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class GenericElement : Entity
    {
        public string Name { get; set; }
        public Guid ElementTypeId { get; set; }
        
        [JsonIgnore]
        public virtual ElementType ElementType { get; set; }

        public string ElementTypeName
        {
            get
            {
                return ElementType == null? "" : ElementType.Name;
            }
        }

        [JsonIgnore]
        public virtual ICollection<Element> Elements { get; set; }
        public List<Guid> ElementsIds
        {
            get
            {
                return Elements == null ? new List<Guid>() : Elements.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<GenericElementGenericTask> GenericElementGenericTasks { get; set; }
        public List<Guid> GenericElementGenericTasksIds
        {
            get
            {
                return GenericElementGenericTasks == null ? new List<Guid>() : GenericElementGenericTasks.Select(x => x.Id).ToList();
            }
        }
    }
}

