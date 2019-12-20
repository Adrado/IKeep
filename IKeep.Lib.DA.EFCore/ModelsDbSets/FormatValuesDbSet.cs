using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class FormatValuesDbSet : IKeepDbSet<FormatValue>
    {
        public FormatValuesDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.FormatValues;
        }
    }
}
