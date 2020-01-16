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
        private readonly ICrudService<FormatValue> _formatValuesService;
        private readonly ICrudService<GenericChoreFormatLabel> _genericChoreFormatLabelsService;
        private readonly IKeepContext _context;
        public FormatService(ICrudService<FormatValue> formatValuesService, 
                             ICrudService<GenericChoreFormatLabel> genericChoreFormatLabelsService,
                             IKeepContext context)
        {
            _formatValuesService = formatValuesService;
            _genericChoreFormatLabelsService = genericChoreFormatLabelsService;
            _context = context;
        }
        
        public void AddFormatValuesToChore(Guid genericChoreId, Guid choreId)
        {
            var gChoreFLabels = _genericChoreFormatLabelsService.GetAll().ToList();
            foreach(GenericChoreFormatLabel gChoreFLabel in gChoreFLabels)
            {
                if(gChoreFLabel.GenericChoreId == genericChoreId)
                {
                    FormatValue formatValue = new FormatValue();
                    formatValue.ChoreId = choreId;
                    formatValue.FormatLabelId = gChoreFLabel.FormatLabelId;
                    _formatValuesService.Add(formatValue);
                }
            }
        }

        public void AddFormatValuesToChores(List<Chore> chores)
        {
            List<FormatValue> FormatValues = new List<FormatValue>();
            foreach(Chore chore in chores)
            {
                Guid formatlabelId = GetFormatLabelId(chore.GenericChoreId);
                FormatValue formatValue = new FormatValue()
                {
                    Id = Guid.NewGuid(),
                    EntityStatus = EntityStatus.Active,
                    ChoreId = chore.Id,
                    FormatLabelId = formatlabelId,
                };

                FormatValues.Add(formatValue);
            }
            InsertFormatValuesToDatabase(FormatValues);
        }

        private Guid GetFormatLabelId(Guid gChoreId)
        {
            GenericChoreFormatLabel genericChoreFormatLabel = _genericChoreFormatLabelsService.GetAll().FirstOrDefault(g => g.GenericChoreId == gChoreId);
            return genericChoreFormatLabel.FormatLabelId;
        }

        private void InsertFormatValuesToDatabase(List<FormatValue> formatValues)
        {
            _context.BulkInsert(formatValues);
        }
    }
}

