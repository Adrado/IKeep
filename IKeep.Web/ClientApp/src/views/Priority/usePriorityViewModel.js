import { useContext, useEffect} from 'react';
import { PriorityService } from '../../providers/Providers';
import Priority from '../../models/Priority';

const usePriorityViewModel = () =>
{
    const PrioritiesService = useContext(PriorityService);

    const SavePriority = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId; 

        if(model !== undefined || model!== null)
        {
            return PrioritiesService.UpdateAsync(model);
        }
    }
      
    const AddNewPriority = (values) =>
    {
        let priority = new Priority();
        priority.Ref = values.Ref;
        priority.Name = values.Name;
        priority.ElementTypeId = values.ElementTypeId; 
 
        if(priority !== undefined || priority!== null)
        {
            return PrioritiesService.AddAsync(priority);
        }
    }
 
    const DeletePriority = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return PrioritiesService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewPriority,
            SavePriority,
            DeletePriority
        ]
    )
}

export default usePriorityViewModel;