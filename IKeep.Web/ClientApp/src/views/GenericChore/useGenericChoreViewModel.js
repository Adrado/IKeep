import { useContext, useEffect} from 'react';
import { GenericChoreService } from '../../providers/Providers';
import GenericChore from '../../models/GenericChore';

const useGenericChoreViewModel = () =>
{
    const GenericChoresService = useContext(GenericChoreService);

    const SaveGenericChore = (model, values) =>
    {
        model.Description = values.Description;
        model.Duration = values.Duration; 
        model.Period = values.Period; 
        model.PriorityId = values.PriorityId; 
        model.FormatId = values.FormatId; 
        model.CategoryId = values.CategoryId; 
        model.ChoresIds = values.ChoresIds; 
       
        if(model !== undefined || model!== null)
        {
            return GenericChoresService.UpdateAsync(model);
        }
    }
      
    const AddNewGenericChore = (values) =>
    {
        let model = new GenericChore();

        model.Description = values.Description;
        model.Duration = values.Duration; 
        model.Period = values.Period; 
        model.PriorityId = values.PriorityId; 
        model.FormatId = values.FormatId; 
        model.CategoryId = values.CategoryId; 
        model.ChoresIds = values.ChoresIds;  
 
        if(model !== undefined || model!== null)
        {
            return GenericChoresService.AddAsync(model);
        }
    }
 
    const DeleteGenericChore = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return GenericChoresService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewGenericChore,
            SaveGenericChore,
            DeleteGenericChore
        ]
    )
}

export default useGenericChoreViewModel;