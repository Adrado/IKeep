using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class User : Entity
    {
        public string LoginName { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Name { get; set; }
        public string FirstSurname { get; set; }
        public string SecondSurname { get; set; }
        public string DNI { get; set; }
        public int Phone { get; set; }
        public int Phone2 { get; set; }
        public string Email { get; set; }
        public string Birthplace { get; set; }
        public DateTime Birthdate { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public DateTime EntryTime { get; set; }
        public DateTime ExitTime { get; set; }
        public string ImageId { get; set; }
        public string Token { get; set; }
        public Guid RoleId { get; set; }

        [JsonIgnore]
        public ICollection<Task> Tasks { get; set; }
        public List<Guid> TasksIds
        {
            get
            {
                return Tasks == null ? new List<Guid>() : Tasks.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public ICollection<Corrective> Correctives { get; set; }
        public List<Guid> CorrectivesIds
        {
            get
            {
                return Correctives == null ? new List<Guid>() : Correctives.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public ICollection<Category> Categories { get; set; }
        public List<Guid> CategoriesIds
        {
            get
            {
                return Categories == null ? new List<Guid>() : Categories.Select(x => x.Id).ToList();
            }
        }
    }
}
