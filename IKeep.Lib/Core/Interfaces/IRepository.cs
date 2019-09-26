using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Core
{
    public interface IRepository<T> : ICrudEntity<T> where T : Entity
    {
    }
}
