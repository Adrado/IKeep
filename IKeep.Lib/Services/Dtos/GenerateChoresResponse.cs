using IKeep.Lib.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class GenerateChoresResponse
    {
        public GenerateChoresResponse()
        {
            StartRequest = DateTime.Now;
            TotalChores = 0;
            TotalElements = 0;
            Installations = new List<InstallationResponse>();
        }
        public IList<InstallationResponse> Installations { get; set; }
        public int TotalElements { get; set; }
        public int TotalChores { get; set; }
        public DateTime StartRequest { get; set; }
        public DateTime EndRequest { get; set; }
        public int Year { get; set; }
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
        [JsonIgnore]
        public List<ChoreResponse> Chores { get; set; }
        
        public int TotalChores { get; set; }
        public int DailyChores
        {
            get
            {
                return Chores == null ? 0 : Chores.Where(x => x.Period == Period.Daily).ToList().Count;
            }
        }

        public int WeeklyChores
        {
            get
            {
                return Chores == null ? 0 : Chores.Where(x => x.Period == Period.Weekly).ToList().Count;
            }
        }
        public int MonthlyChores
        {
            get
            {
                return Chores == null ? 0 : Chores.Where(x => x.Period == Period.Monthly).ToList().Count;
            }
        }
        public int BimonthlyChores
        {
            get
            {
                return Chores == null ? 0 : Chores.Where(x => x.Period == Period.Bimonthly).ToList().Count;
            }
        }
        public int QuarterlyChores
        {
            get
            {
                return Chores == null ? 0 : Chores.Where(x => x.Period == Period.Quarterly).ToList().Count;
            }
        }
        public int SemesterChores
        {
            get
            {
                return Chores == null ? 0 : Chores.Where(x => x.Period == Period.Semester).ToList().Count;
            }
        }
        public int YearlyChores
        {
            get
            {
                return Chores == null ? 0 : Chores.Where(x => x.Period == Period.Yearly).ToList().Count;
            }
        }
        public int TwoYearlyChores
        {
            get
            {
                return Chores == null ? 0 : Chores.Where(x => x.Period == Period.TwoYearly).ToList().Count;
            }
        }
        public int FourYearlyChores
        {
            get
            {
                return Chores == null ? 0 : Chores.Where(x => x.Period == Period.FourYearly).ToList().Count;
            }
        }
    }

    public class ChoreResponse
    {
        public Period Period { get; set; }
        public int TotalChores { get; set; }
    }
}
