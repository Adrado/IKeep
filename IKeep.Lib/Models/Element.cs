using IKeep.Lib.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Element : Entity
    {
        public string Name { get; set; }
        public Guid? ElementTypeId { get; set; }
        [JsonIgnore]
        public ElementType ElementType { get; set; }
        // Vigilar las posibilidades del campo Status
        public StatusElement Status { get; set; }
        public Guid AreaId { get; set; }
        public Guid? GenericElementId { get; set; }
        [JsonIgnore]
        public GenericElement GenericElement { get; set; }

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

        [JsonIgnore]
        public ICollection<ElementImage> ElementImages { get; set; }
        public List<Guid> ElementImagesIds
        {
            get
            {
                return ElementImages == null ? new List<Guid>() : ElementImages.Select(x => x.Id).ToList();
            }
        }
    }
    public enum StatusElement
    {
        Active,
        Inactive
    }
}


