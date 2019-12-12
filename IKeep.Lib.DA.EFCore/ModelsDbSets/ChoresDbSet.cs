using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class ChoresDbSet : IKeepDbSet<Chore>
    {
        public ChoresDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Chores;
        }
    }
}
