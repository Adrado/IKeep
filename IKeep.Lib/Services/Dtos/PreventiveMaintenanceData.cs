using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Dtos
{
    public class PreventiveMaintenanceData
    {
        public PreventiveMaintenanceData()
        {
            TableData = new List<ChoresByType>();
        }
        public List<ChoresByType> TableData { get; set; }
    }

    public class ChoresByType
    {
        public string ChoreTypeName { get; set; }
        public List<ChoresByTypeAndPeriod> ChoresByTypeAndPeriod { get; set; }
    }

    public class ChoresByTypeAndPeriod
    {
        public Period Period { get; set; }
        public string ChoreTypeName { get; set; }
        public int numChores { get; set; }
        public List<ChoresByTypePeriodAndElement> TotalFilteredList { get; set; }
    }

    public class ChoresByTypePeriodAndElement
    {
        public Period Period { get; set; }
        public string ChoreTypeName { get; set; }
        public string ElementName { get; set; }
        public int NumChores { get; set; }
        public List<Chore> Chores { get; set; }
    }
}
