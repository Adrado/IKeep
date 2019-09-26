using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class UserCategoriesDbSet : IKeepDbSet<UserCategory>
    {
        public UserCategoriesDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.UserCategories;
        }
    }
}
