using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class ObservationsDbSet : IKeepDbSet<Observation>
    {
        public ObservationsDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Observations;
        }
    }
}
