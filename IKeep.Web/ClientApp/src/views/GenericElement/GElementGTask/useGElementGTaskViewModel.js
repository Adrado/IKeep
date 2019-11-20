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
            GElementGTasksService.UpdateAsync(model)
            .then((response) => {
                /* OnModified();
                Select(); */
            });
        }
    }
        
    const AddNewGElementGTasks = (genericElementId, genericTasks) =>
    {
        for (let i in genericTasks)
        {
            const GElementGTask = new GenericElementGenericTask()
            const GTask = genericTasks[i];
            console.log(GTask);
            GElementGTask.GenericElementId = genericElementId;
            GElementGTask.GenericTaskId = GTask.Id;
            GElementGTask.Status = 1;

            if(GElementGTask.GenericElementId !== null || GElementGTask.GenericElementId !== undefined && 
                GElementGTask.GenericTaskId !== null || GElementGTask.GenericTaskId !== undefined)
            {
                    GElementGTasksService.AddAsync(GElementGTask)
                    .then((response) => { 
                        /* OnModified();
                        Select(); */
                    });
            }
        }
    }
 
    const DeleteGElementGTask = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            GElementGTasksService.DeleteAsync(model.Id)
                .then((response) => {
                    /* OnModified();
                    Select(); */
                })
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