using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class GenericChoresDbset : IKeepDbSet<GenericChore>
    {
        public GenericChoresDbset(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.GenericChores;
        }
    }
}
