//React Hooks
import { useContext, useEffect} from 'react';
//CRUD Context Services
import { FormatService } from '../../providers/Providers';
//Model
import Format from '../../models/Format';

const useFormatViewModel = () =>
{
    const FormatsService = useContext(FormatService);

    const SaveFormat = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId; 

        if(model !== undefined || model!== null)
        {
            return FormatsService.UpdateAsync(model);
        }
    }
      
    const AddNewFormat = (values) =>
    {
        let format = new Format();
        format.Ref = values.Ref;
        format.Name = values.Name;
        format.ElementTypeId = values.ElementTypeId; 
 
        if(format !== undefined || format!== null)
        {
            return FormatsService.AddAsync(format);
        }
    }
 
    const DeleteFormat = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return FormatsService.DeleteAsync(model.Id);
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

export default useFormatViewModel;