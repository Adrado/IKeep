using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class PrioritiesDbSet : IKeepDbSet<Priority>
    {
        public PrioritiesDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Priorities;
        }
    }
}
