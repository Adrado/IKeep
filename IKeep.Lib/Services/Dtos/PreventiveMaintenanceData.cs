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
            TableData = new List<ChoresByTypeAndPeriod>();
        }
        public List<ChoresByTypeAndPeriod> TableData { get; set; }
    }

    public class ChoresByTypeAndPeriod
    {
        public Period Period { get; set; }
        public string ChoreTypeName { get; set; }
        public int numChores { get; set; }
        public List<ChoresByElement> TypeAndPeriodChores { get; set; }
    }

    public class ChoresByElement
    {
        public Period Period { get; set; }
        public string ChoreTypeName { get; set; }
        public string ElementName { get; set; }
        public int NumChores { get; set; }
        public List<Chore> Chores { get; set; }
    }
}
