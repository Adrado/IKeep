using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class UsersDbSet : IKeepDbSet<User>
    {
        public UsersDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Users;
        }
    }
}
