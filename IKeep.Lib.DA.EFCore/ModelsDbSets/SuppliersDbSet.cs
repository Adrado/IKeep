using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class SuppliersDbSet : IKeepDbSet<Supplier>
    {
        public SuppliersDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Suppliers;
        }
    }
}
