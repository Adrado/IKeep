import { useContext, useEffect} from 'react';
import { Services } from '../../providers/Providers';
//import {Functions} from '../../providers/Providers';

const useGenericElementViewModel = (OnModified, Select) =>
{
    const GenericElementsService = useContext(Services);
    //const OnModified = useContext(Functions);
    const SaveGenericElement = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;

        
        if(model !== undefined || model!== null)
        {
            GenericElementsService.UpdateAsync(model)
            .then((response) => {
                OnModified();
                Select();
            });
        }
    }
        
    const AddNewGenericElement = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
 
        if(model !== undefined || model!== null)
        {
            GenericElementsService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                    Select();
                });
        }
    }
 
    const DeleteGenericElement = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            GenericElementsService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                    Select();
                })
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewGenericElement,
            SaveGenericElement,
            DeleteGenericElement
        ]
    )
}

export default useGenericElementViewModel;