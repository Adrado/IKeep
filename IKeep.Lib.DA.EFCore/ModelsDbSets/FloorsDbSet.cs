using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class FloorsDbSet : IKeepDbSet<Floor>
    {
        public FloorsDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Floors;
        }
    }
}
