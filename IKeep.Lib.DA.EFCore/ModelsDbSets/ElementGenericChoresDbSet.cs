using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class ElementGenericChoresDbSet : IKeepDbSet<ElementGenericChore>
    {
        public ElementGenericChoresDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.ElementGenericChores;
        }
    }
}
