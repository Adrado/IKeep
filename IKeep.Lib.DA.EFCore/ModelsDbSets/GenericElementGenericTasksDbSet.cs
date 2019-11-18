using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class GenericElementGenericTasksDbSet : IKeepDbSet<GenericElementGenericTask>
    {
        public GenericElementGenericTasksDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.GenericElementGenericTasks;
        }
    }
}
