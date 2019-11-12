import { useContext, useEffect} from 'react';
import { Services } from '../../providers/Providers';
//import {Functions} from '../../providers/Providers';

const useGenericElementViewModel = (OnModified, Select) =>
{
    const GenericElementsService = useContext(Services);
    //const OnModified = useContext(Functions);
    const SaveGenericElement = (model, values, elementTypeId) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = elementTypeId; 

        if(model !== undefined || model!== null)
        {
            GenericElementsService.UpdateAsync(model)
            .then((response) => {
                OnModified();
                Select();
            });
        }
    }
        
    const AddNewGenericElement = (model, values, elementTypeId) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = elementTypeId; 
 
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