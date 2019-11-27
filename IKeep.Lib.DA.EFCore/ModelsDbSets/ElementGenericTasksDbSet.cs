using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class ElementGenericTasksDbSet : IKeepDbSet<ElementGenericTask>
    {
        public ElementGenericTasksDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.ElementGenericTasks;
        }
    }
}
