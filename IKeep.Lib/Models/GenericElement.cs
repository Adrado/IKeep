using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class GenericElement : Entity
    {
        public string Ref { get; set; }
        public string Name { get; set; }
        // Vigilar las posibilidades del campo Status
        public StatusElement Status { get; set; }
        public Guid ElementTypeId { get; set; }
        public Guid AreaId { get; set; }

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
        public ICollection<ElementObservation> ElementObservations { get; set; }
        public List<Guid> ElementObservationsIds
        {
            get
            {
                return ElementObservations == null ? new List<Guid>() : ElementObservations.Select(x => x.Id).ToList();
            }
        }
    }

    public enum StatusElement
    {
        Active,
        Inactive
    }
}

