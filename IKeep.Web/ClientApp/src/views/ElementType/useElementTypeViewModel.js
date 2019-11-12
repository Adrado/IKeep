import { useContext, useEffect} from 'react';
import { Services } from '../../providers/Providers';
//import {Functions} from '../../providers/Providers';

const useElementTypeViewModel = (OnModified, Select) =>
{
    const ElementTypesService = useContext(Services);
    //const OnModified = useContext(Functions);
    const SaveElementType = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;

        
        if(model !== undefined || model!== null)
        {
            ElementTypesService.UpdateAsync(model)
            .then((response) => {
                OnModified();
                Select();
            });
        }
    }
        
    const AddNewElementType = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
 
        if(model !== undefined || model!== null)
        {
            ElementTypesService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                    Select();
                });
        }
    }
 
    const DeleteElementType = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            ElementTypesService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                    Select();
                })
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewElementType,
            SaveElementType,
            DeleteElementType
        ]
    )
}

export default useElementTypeViewModel;