using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class CorrectivesDbSet : IKeepDbSet<Corrective>
    {
        public CorrectivesDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Correctives;
        }
    }
}
