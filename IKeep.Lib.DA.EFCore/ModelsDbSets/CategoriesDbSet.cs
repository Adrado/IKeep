using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class CategoriesDbSet : IKeepDbSet<Category>
    {
        public CategoriesDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Categories;
        }
    }
}
