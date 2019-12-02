import { useContext, useEffect} from 'react';
import { ElementGTaskService } from '../../../../providers/Providers';
import ElementGenericTask from '../../../../models/ElementGenericTask';

const useElementGTaskViewModel = () =>
{
    const ElementGTasksService = useContext(ElementGTaskService);

    const SaveElementGTask = (elementGTask, values) =>
    {
        elementGTask.Ref = values.Ref;
        //elementGTask.ElementGTaskTypeId = values.ElementGTaskTypeId;
        elementGTask.Ref = values.Ref;
        elementGTask.Brand = values.Brand;
        elementGTask.Model = values.Model;
        elementGTask.Description = values.Description;
        elementGTask.SafetyAndHealth = values.SafetyAndHealth;

        if(elementGTask !== undefined && elementGTask !== null)
        {
            return ElementGTasksService.UpdateAsync(elementGTask);
        }
    }
      
    const AddNewElementGTask =  (elementId, GElementGTask) =>
    {
        let elementGTask = new ElementGenericTask();
        elementGTask.ElementId = elementId;
        elementGTask.GenericTaskId = GElementGTask.GenericTaskId;
        elementGTask.Status = GElementGTask.Status;

        console.log(elementGTask);
 
        if(elementGTask !== undefined && elementGTask!== null)
        {
            return ElementGTasksService.AddAsync(elementGTask);
        }
    }
 
    const DeleteElementGTask = (model) =>
    {
        if(model !== undefined && model!== null)
        {
            return ElementGTasksService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewElementGTask,
            SaveElementGTask,
            DeleteElementGTask
        ]
    )
}

export default useElementGTaskViewModel;