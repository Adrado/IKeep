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
        public DateTime? RetirementDate { get; set; }
        public string Ref { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string SafetyAndHealth { get; set; }
        public Guid AreaId { get; set; }
        [JsonIgnore]
        public virtual Area Area { get; set; }
        public string Location
        {
            get
            {
                return Area == null ? "" : Area.Floor.Building.Name + Area.Floor.Name + Area.Name;
            }
        }
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
        public string TypeName
        {
            get
            {
                return GenericElement == null ? "" : GenericElement.ElementTypeName;
            }
        }

        [JsonIgnore]
        public virtual ICollection<ElementGenericChore> ElementGenericChores { get; set; }
        public List<Guid> ElementGenericChoresIds
        {
            get
            {
                return ElementGenericChores == null ? new List<Guid>() : ElementGenericChores.Select(x => x.Id).ToList();
            }
        }

        [JsonIgnore]
        public virtual ICollection<Chore> Chores { get; set; }

        //Vigilar si es la mejor opción (Será siempre necesario que se muestre el historial de los correctivos abiertos al elemento?)
        public virtual ICollection<Corrective> Correctives { get; set; }

        [JsonIgnore]
        public virtual ICollection<ElementObservation> ElementObservations { get; set; }
        //public List<Observation> Observations
        //{
        //    get
        //    {
        //        return ElementObservations == null ? new List<Observation>() : 
        //            ElementObservations.Select(x => new Observation {
        //                Id = x.Observation.Id,
        //                Description = x.Observation.Description,
        //                EntityStatus = x.Observation.EntityStatus,
        //                Type = x.Observation.Type })
        //            .ToList();
        //    }
        //}

        [JsonIgnore]
        public virtual ICollection<ElementImage> ElementImages { get; set; }
        
    }
    public enum StatusElement
    {
        Inactive,
        Active
    }
}


