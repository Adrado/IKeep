using IKeep.Lib.Models;
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
        public int TotalChores { get; set; }
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
        public int TotalChores { get; set; }
    }

    public class ElementResponse
    {
        public string ElementRef { get; set; }
        public int NumChores { get; set; }
        public int DailyChores { get; set; }
        public int WeeklyChores { get; set; }
        public int MonthlyChores { get; set; }
        public int BimonthlyChores { get; set; }
        public int QuarterlyChores { get; set; }
        public int SemesterChores { get; set; }
        public int YearlyChores { get; set; }
        public int TwoYearlyChores { get; set; }
        public int FourYearlyChores { get; set; }
    }

    public class ChoreResponse
    {
        public Period Period { get; set; }
        public int TotalChores { get; set; }
    }
}
