import { useContext, useEffect} from 'react';
import { GenericTaskService } from '../../providers/Providers';
import GenericTask from '../../models/GenericTask';

const useGenericTaskViewModel = () =>
{
    const GenericTasksService = useContext(GenericTaskService);

    const SaveGenericTask = (model, values) =>
    {
        model.Description = values.Description;
        model.Duration = values.Duration; 
        model.Period = values.Period; 
        model.PriorityId = values.PriorityId; 
        model.FormatId = values.FormatId; 
        model.CategoryId = values.CategoryId; 
        model.TasksIds = values.TasksIds; 
       


        if(model !== undefined || model!== null)
        {
            return GenericTasksService.UpdateAsync(model);
        }
    }
      
    const AddNewGenericTask = (values) =>
    {
        let model = new GenericTask();

        model.Description = values.Description;
        model.Duration = values.Duration; 
        model.Period = values.Period; 
        model.PriorityId = values.PriorityId; 
        model.FormatId = values.FormatId; 
        model.CategoryId = values.CategoryId; 
        model.TasksIds = values.TasksIds;  
 
        if(model !== undefined || model!== null)
        {
            return GenericTasksService.AddAsync(model);
        }
    }
 
    const DeleteGenericTask = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return GenericTasksService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewGenericTask,
            SaveGenericTask,
            DeleteGenericTask
        ]
    )
}

export default useGenericTaskViewModel;