using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class NewChoresResponse
    {
        public IList<InstallationResponse> Installations { get; set; }
        public int TotalElements { get; set; }
        public DateTime StartRequest { get; set; }
        public DateTime EndRequest { get; set; }
    }

    public class InstallationResponse
    {
        public string InstallationName { get; set; }
        public IList<ElementResponse> Elements { get; set; }
        public int ElementsNumber
        {
            get
            {
                return Elements == null ? 0 : Elements.Count();
            }
        }
    }

    public class ElementResponse
    {
        public string ElementRef { get; set; }
        public int NumChores { get; set; }
    }

    public class ChoreResponse
    {
        public int ChoresNum { get; set; }
    }
}
