import { useContext, useEffect} from 'react';
import { GenericTaskService } from '../../providers/Providers';
//import {Functions} from '../../providers/Providers';

const useGenericTaskViewModel = (OnModified, Select) =>
{
    const GenericTasksService = useContext(GenericTaskService);
    //const OnModified = useContext(Functions);
    const SaveGenericTask = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;

        
        if(model !== undefined || model!== null)
        {
            GenericTasksService.UpdateAsync(model)
            .then((response) => {
                OnModified();
                Select();
            });
        }
    }
        
    const AddNewGenericTask = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
 
        if(model !== undefined || model!== null)
        {
            GenericTasksService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                    Select();
                });
        }
    }
 
    const DeleteGenericTask = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            GenericTasksService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                    Select();
                })
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