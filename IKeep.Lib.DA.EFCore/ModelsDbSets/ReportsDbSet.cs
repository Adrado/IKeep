using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class ReportsDbSet : IKeepDbSet<Report>
    {
        public ReportsDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Reports;
        }
    }
}
