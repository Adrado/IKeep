﻿using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class RolesDbSet : IKeepDbSet<Role>
    {
        public RolesDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Roles;
        }
    }
}
