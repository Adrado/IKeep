using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class PartialReport
    {
       public  List<ElementResponse> Elements { get; set; }
       public DateTime StartRequest { get; set; }
       public string Status { get; set; }
    }
}
