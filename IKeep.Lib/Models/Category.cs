using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Category : Entity
    {
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<UserCategory> UserCategories { get; set; }
        public List<Guid> UserCategoriesIds
        {
            get
            {
                return UserCategories == null ? new List<Guid>() : UserCategories.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public ICollection<GenericTask> GenericTasks { get; set; }
        public List<Guid> GenericTasksIds
        {
            get
            {
                return GenericTasks == null ? new List<Guid>() : GenericTasks.Select(x => x.Id).ToList();
            }
        }
    }
}
