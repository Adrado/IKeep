using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class FormatLabelsDbSet : IKeepDbSet<FormatLabel>
    {
        public FormatLabelsDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.FormatLabels;
        }
    }
}
