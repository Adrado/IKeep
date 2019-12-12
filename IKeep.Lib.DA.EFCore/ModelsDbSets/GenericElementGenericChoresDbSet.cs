using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class GenericElementGenericChoresDbSet : IKeepDbSet<GenericElementGenericChore>
    {
        public GenericElementGenericChoresDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.GenericElementGenericChores;
        }
    }
}
