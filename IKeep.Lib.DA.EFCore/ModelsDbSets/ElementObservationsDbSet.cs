using IKeep.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.DA.EFCore
{
    public class ElementObservationsDbSet : IKeepDbSet<ElementObservation>
    {
        public ElementObservationsDbSet(IKeepContext dbContext)
        {
            DbContext = dbContext;
            DbSet = dbContext.ElementObservations;
        }
    }
}
