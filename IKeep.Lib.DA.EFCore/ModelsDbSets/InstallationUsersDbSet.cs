using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class InstallationUsersDbSet : IKeepDbSet<InstallationUser>
    {
        public InstallationUsersDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.InstallationUsers;
        }
    }
}
