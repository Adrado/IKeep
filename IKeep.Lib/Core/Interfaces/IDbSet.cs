using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Core
{
    public interface IDbSet<T> : ICrudEntity<T> where T: Entity
    {
    }
}
