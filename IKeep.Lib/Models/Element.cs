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
        // Vigilar las posibilidades del campo Status
        public StatusElement Status { get; set; }
        public string Ref { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string SafetyAndHealth { get; set; }
        public Guid AreaId { get; set; }
        public Guid? GenericElementId { get; set; }
        [JsonIgnore]
        public virtual GenericElement GenericElement { get; set; }
        public string Name
        {
            get
            {
                return GenericElement == null ? "" : GenericElement.Name;
            }
        }

        public string ElementTypeName
        {
            get
            {
                return GenericElement == null ? "" : GenericElement.ElementTypeName;
            }
        }

        [JsonIgnore]
        public virtual ICollection<ElementGenericTask> ElementGenericTasks { get; set; }
        public List<Guid> ElementGenericTasksIds
        {
            get
            {
                return ElementGenericTasks == null ? new List<Guid>() : ElementGenericTasks.Select(x => x.Id).ToList();
            }
        }

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
        public virtual ICollection<ElementObservation> ElementObservations { get; set; }
        public List<Guid> ElementObservationsIds
        {
            get
            {
                return ElementObservations == null ? new List<Guid>() : ElementObservations.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<ElementImage> ElementImages { get; set; }
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


