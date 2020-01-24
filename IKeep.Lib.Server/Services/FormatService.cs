using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IKeep.Lib.Core;
using EFCore.BulkExtensions;

namespace IKeep.Lib.Server.Services
{
    public class FormatService : IFormatService
    {
        private readonly ICrudService<GenericChoreFormatLabel> _genericChoreFormatLabelsService;
        private readonly IKeepContext _context;
        public FormatService(ICrudService<GenericChoreFormatLabel> genericChoreFormatLabelsService,
                             IKeepContext context)
        {
            _genericChoreFormatLabelsService = genericChoreFormatLabelsService;
            _context = context;
        }
        
        public void AddFormatValuesToChores(List<Chore> chores)
        {
            List<FormatValue> FormatValues = new List<FormatValue>();
            foreach(Chore chore in chores)
            {
                List<Guid> formatLabelIds = GetFormatLabelId(chore.GenericChoreId);
                if (formatLabelIds == null)
                {
                    continue;
                }
                foreach(Guid formatLabelId in formatLabelIds )
                {
                    FormatValue formatValue = new FormatValue()
                    {
                        Id = Guid.NewGuid(),
                        EntityStatus = EntityStatus.Active,
                        ChoreId = chore.Id,
                        FormatLabelId = formatLabelId,
                    };

                    FormatValues.Add(formatValue);
                }
                
            }
            InsertFormatValuesToDatabase(FormatValues);
        }

        private List<Guid> GetFormatLabelId(Guid gChoreId)
        {
            return _genericChoreFormatLabelsService.GetAll().Where(g => g.GenericChoreId == gChoreId)
                    .Select(x => x.FormatLabelId).ToList();
        }

        private void InsertFormatValuesToDatabase(List<FormatValue> formatValues)
        {
            _context.BulkInsert(formatValues);
        }
    }
}

