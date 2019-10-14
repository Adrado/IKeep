using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Installation : Entity
    {
        public string Ref { get; set; }
        public string Name { get; set; }
        public string CIF { get; set; }
        public int CP { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int Phone { get; set; }
        public int Phone2 { get; set; }
        public int Fax { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public ICollection<Building> Buildings { get; set; }
        public List<Guid> BuildingsIds
        {
            get
            {
                return Buildings == null ? new List<Guid>() : Buildings.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public ICollection<Report> Reports { get; set; }
        public List<Guid> ReportsIds
        {
            get
            {
                return Reports == null ? new List<Guid>() : Reports.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public ICollection<Inspection> Inspections { get; set; }
        public List<Guid> InspectionsIds
        {
            get
            {
                return Inspections == null ? new List<Guid>() : Inspections.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public ICollection<InstallationUser> InstallationUsers { get; set; }
        public List<Guid> InstallationUsersIds
        {
            get
            {
                return InstallationUsers == null ? new List<Guid>() : InstallationUsers.Select(x => x.Id).ToList();
            }
        }
    }
}