using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Models
{
    public class Map : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }

        //Vigilar la ubicación de la imágen
        public string ImageId { get; set; }
        public Guid FloorId { get; set; }

        //Vigilar que pueda coincidir con el campo Ref de la clase Area
        public Guid? AreaId { get; set; }
    }
}
