using IKeep.Lib.DA.EFCore;
using IKeep.Lib.Models;
using IKeep.Lib.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IKeep.Lib.Core;

namespace IKeep.Lib.Server.Services
{
    public class FormatService : IFormatService
    {
        private readonly ICrudService<FormatValue> _formatValuesService;
        private readonly ICrudService<GenericChoreFormatLabel> _genericChoreFormatLabelsService;
        public FormatService(ICrudService<FormatValue> formatValuesService, ICrudService<GenericChoreFormatLabel> genericChoreFormatLabelsService)
        {
            _formatValuesService = formatValuesService;
            _genericChoreFormatLabelsService = genericChoreFormatLabelsService;
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
    }
}

