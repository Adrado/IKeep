using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class InstallationsDbSet : IKeepDbSet<Installation>
    {
        public InstallationsDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Installations;
        }
    }
}
