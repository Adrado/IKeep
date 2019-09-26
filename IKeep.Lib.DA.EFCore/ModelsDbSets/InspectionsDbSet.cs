using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class InspectionsDbSet : IKeepDbSet<Inspection>
    {
        public InspectionsDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Inspections;
        }
    }
}
