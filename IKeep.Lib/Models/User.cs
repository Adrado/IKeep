﻿using IKeep.Lib.Core;
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
        public string ImageId { get; set; }
        public string Token { get; set; }

        [JsonIgnore]
        public virtual ICollection<Task> Tasks { get; set; }
        public List<Guid> TasksIds
        {
            get
            {
                return Tasks == null ? new List<Guid>() : Tasks.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<Corrective> Correctives { get; set; }
        public List<Guid> CorrectivesIds
        {
            get
            {
                return Correctives == null ? new List<Guid>() : Correctives.Select(x => x.Id).ToList();
            }
        }

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
        public virtual ICollection<InstallationUser> InstallationUsers { get; set; }
        public List<Guid> InstallationUsersIds
        {
            get
            {
                return InstallationUsers == null ? new List<Guid>() : InstallationUsers.Select(x => x.Id).ToList();
            }
        }
    }
}
