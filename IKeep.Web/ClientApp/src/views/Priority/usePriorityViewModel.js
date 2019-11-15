import { useContext, useEffect} from 'react';
import { PriorityService } from '../../providers/Providers';
//import {Functions} from '../../providers/Providers';

const usePriorityViewModel = (OnModified, Select) =>
{
    const PrioritysService = useContext(PriorityService);
    //const OnModified = useContext(Functions);
    const SavePriority = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;

        
        if(model !== undefined || model!== null)
        {
            PrioritysService.UpdateAsync(model)
            .then((response) => {
                OnModified();
                Select();
            });
        }
    }
        
    const AddNewPriority = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
 
        if(model !== undefined || model!== null)
        {
            PrioritysService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                    Select();
                });
        }
    }
 
    const DeletePriority = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            PrioritysService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                    Select();
                })
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