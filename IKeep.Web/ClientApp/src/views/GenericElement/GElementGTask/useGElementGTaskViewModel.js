import { useContext, useEffect} from 'react';
import { GElementGTaskService } from '../../../providers/Providers';
import GenericElementGenericTask from '../../../models/GenericElementGenericTask'
//import {Functions} from '../../providers/Providers';

const useGElementGTaskViewModel = () =>
{
    const GElementGTasksService = useContext(GElementGTaskService);

    const SaveGElementGTask = (model, values) =>
    {
        model.Status = values.Status;

        if(model !== undefined || model!== null)
        {
           return GElementGTasksService.UpdateAsync(model)
            /* .then((response) => {
                OnModified();
                Select();
            }); */
        }
    }
        
    const AddNewGElementGTasks = (genericElementId, model) =>
    {
        const GElementGTask = new GenericElementGenericTask()

        GElementGTask.GenericElementId = genericElementId;
        GElementGTask.GenericTaskId = model.Id;
        GElementGTask.Status = 1;

        if(GElementGTask.GenericElementId !== null || GElementGTask.GenericElementId !== undefined && 
            GElementGTask.GenericTaskId !== null || GElementGTask.GenericTaskId !== undefined)
        {
            return GElementGTasksService.AddAsync(GElementGTask)
        }
    }
 
    const DeleteGElementGTask = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            return GElementGTasksService.DeleteAsync(model.Id)
                /* .then((response) => {
                    OnModified();
                    Select();
                }) */
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewGElementGTasks,
            SaveGElementGTask,
            DeleteGElementGTask
        ]
    )
}

export default useGElementGTaskViewModel;