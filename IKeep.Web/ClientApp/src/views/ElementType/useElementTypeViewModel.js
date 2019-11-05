import { useContext, useEffect} from 'react';
import { Services } from '../../providers/Providers';
import {Functions} from '../../providers/Providers';

const useElementTypeViewModel = () =>
{
    const ElementTypesService = useContext(Services);
    const OnModified = useContext(Functions);
    const SaveElementType = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        
        if(model !== undefined || model!== null)
        {
            ElementTypesService.UpdateAsync(model)
            .then((response) => {
                OnModified();
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
                });
        }
    }
 
    const DeleteElementType = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            ElementTypesService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
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