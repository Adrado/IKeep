using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class ChoreTypesDbSet : IKeepDbSet<ChoreType>
    {
        public ChoreTypesDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.ChoreTypes;
        }
    }
}
