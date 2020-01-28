using IKeep.Lib.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace IKeep.Lib.Services.Interfaces
{
    public interface IImageService : IGenericService
    {
        string HashImage(string input);
    }
}
