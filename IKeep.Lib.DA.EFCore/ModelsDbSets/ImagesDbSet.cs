using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class UserImagesDbSet : IKeepDbSet<UserImage>
    {
        public UserImagesDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.UserImages;
        }
    }
}
