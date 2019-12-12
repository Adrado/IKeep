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
        public virtual ICollection<UserCategory> UserCategories { get; set; }
        public List<Guid> UserCategoriesIds
        {
            get
            {
                return UserCategories == null ? new List<Guid>() : UserCategories.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<GenericChore> GenericChores { get; set; }
        public List<Guid> GenericChoresIds
        {
            get
            {
                return GenericChores == null ? new List<Guid>() : GenericChores.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<Chore> Chores { get; set; }
        public List<Guid> ChoresIds
        {
            get
            {
                return Chores == null ? new List<Guid>() : Chores.Select(x => x.Id).ToList();
            }
        }
    }
}
