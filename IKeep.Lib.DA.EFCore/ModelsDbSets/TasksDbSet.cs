using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class TasksDbSet : IKeepDbSet<Task>
    {
        public TasksDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.Tasks;
        }
    }
}
