﻿using IKeep.Lib.Core;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IKeep.Lib.Services.Interfaces
{
    public interface IChoreService : IGenericService
    {
        bool AddChores (NewChoresRequest newChoresRequest);
        IQueryable<Chore> GetAll();
    }
}
