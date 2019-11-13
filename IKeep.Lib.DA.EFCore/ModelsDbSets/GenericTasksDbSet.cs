using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class GenericTasksDbset : IKeepDbSet<GenericTask>
    {
        public GenericTasksDbset(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.GenericTasks;
        }
    }
}
