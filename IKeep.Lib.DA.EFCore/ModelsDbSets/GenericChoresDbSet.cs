﻿using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class GenericChoresDbSet : IKeepDbSet<GenericChore>
    {
        public GenericChoresDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.GenericChores;
        }
    }
}
