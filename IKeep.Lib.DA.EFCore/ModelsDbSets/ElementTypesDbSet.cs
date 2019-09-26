using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class ElementTypesDbSet : IKeepDbSet<ElementType>
    {
        public ElementTypesDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.ElementTypes;
        }
    }
}
