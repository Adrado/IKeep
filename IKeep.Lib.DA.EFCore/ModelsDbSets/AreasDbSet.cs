using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class AreasDbSet : IKeepDbSet<Area>
    {
        public AreasDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Areas;
        }
    }
}
