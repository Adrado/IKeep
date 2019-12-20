using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class GenericChoreFormatLabelsDbSet : IKeepDbSet<GenericChoreFormatLabel>
    {
        public GenericChoreFormatLabelsDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.GenericChoreFormatLabels;
        }
    }
}
