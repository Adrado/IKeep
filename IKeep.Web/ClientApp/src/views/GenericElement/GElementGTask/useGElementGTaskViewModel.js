import { useContext, useEffect} from 'react';
import { GElementGTaskService } from '../../../providers/Providers';
//import {Functions} from '../../providers/Providers';

const useGElementGTaskViewModel = (OnModified, Select) =>
{
    const GElementGTasksService = useContext(GElementGTaskService);
    //const OnModified = useContext(Functions);
    const SaveGElementGTask = (model, values, elementTypeId) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = elementTypeId; 

        if(model !== undefined || model!== null)
        {
            GElementGTasksService.UpdateAsync(model)
            .then((response) => {
                OnModified();
                Select();
            });
        }
    }
        
    const AddNewGElementGTask = (model, values, elementTypeId) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = elementTypeId; 
 
        if(model !== undefined || model!== null)
        {
            GElementGTasksService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                    Select();
                });
        }
    }
 
    const DeleteGElementGTask = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            GElementGTasksService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                    Select();
                })
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewGElementGTask,
            SaveGElementGTask,
            DeleteGElementGTask
        ]
    )
}

export default useGElementGTaskViewModel;