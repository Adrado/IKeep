using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Core
{
    public interface ICrudService<T> : IGenericService, ICrudEntity<T> where T : Entity
    {
    }
}
