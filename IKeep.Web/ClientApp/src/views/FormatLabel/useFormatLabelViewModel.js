//React Hooks
import { useContext, useEffect} from 'react';
//CRUD Context Services
import { FormatLabelService } from '../../providers/Providers';
//Model
import FormatLabel from '../../models/FormatLabel';

const useFormatLabelViewModel = () =>
{
    const FormatLabelsService = useContext(FormatLabelService);

    const SaveFormat = (model, values) =>
    {
        
        model.Name = values.Name;
        model.Extension = values.Extension; 

        if(model !== undefined || model!== null)
        {
            return FormatLabelsService.UpdateAsync(model);
        }
    }
      
    const AddNewFormat = (values) =>
    {
        let formatLabel = new FormatLabel();
        
        formatLabel.Name = values.Name;
        formatLabel.Extension = values.Extension;
 
        if(formatLabel !== undefined || formatLabel!== null)
        {
            return FormatLabelsService.AddAsync(formatLabel);
        }
    }
 
    const DeleteFormat = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return FormatLabelsService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewFormat,
            SaveFormat,
            DeleteFormat
        ]
    )
}

export default useFormatLabelViewModel;