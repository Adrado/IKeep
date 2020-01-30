using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class MultimediaDto
    {
        public Guid MultimediaId { get; set; }
        public Guid ParentId { get; set; }
        public string Base64 { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string Name { get; set; }
        //public string Extension { get; set; }
        public int? Downloads { get; set; }
        public string Description { get; set; }
        
    }
}
