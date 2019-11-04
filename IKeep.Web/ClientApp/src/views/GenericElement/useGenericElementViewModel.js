import { useContext, useEffect} from 'react';
import { Services } from '../../../providers/Providers';
import {Functions} from '../../../providers/Providers';

const useGenericElementViewModel = () =>
{
    const GenericElementsService = useContext(Services);
    const OnModified = useContext(Functions);
    const SaveGenericElement = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId;
        
        if(model !== undefined || model!== null)
        {
            GenericElementsService.UpdateAsync(model)
            .then((response) => {
                OnModified();
            });
        }
    }
        
    const AddNewGenericElement = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId;
        if(model !== undefined || model!== null)
        {
            GenericElementsService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                });
        }
    }
 
    const DeleteGenericElement = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            GenericElementsService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
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