using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class GenericElementsDbSet : IKeepDbSet<GenericElement>
    {
        public GenericElementsDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.GenericElements;
        }
    }
}
