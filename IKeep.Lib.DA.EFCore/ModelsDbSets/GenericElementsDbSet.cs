using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class GenericElementsDbset : IKeepDbSet<GenericElement>
    {
        public GenericElementsDbset(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.GemericElements;
        }
    }
}
