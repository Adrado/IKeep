import { useContext, useEffect} from 'react';
import { Services } from '../../providers/Providers';

import {Functions} from '../../providers/Providers'

const useAreaViewModel = () =>
{
    const AreasService = useContext(Services);
    const OnModified = useContext(Functions);
    const SaveArea = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        
        if(model !== undefined || model!== null)
        {
            AreasService.UpdateAsync(model)
            .then((response) => {
                OnModified();
            });
        }
    }
        
    const AddNewArea = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        if(model !== undefined || model!== null)
        {
            AreasService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                });
        }
    }
 
    const DeleteArea = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            AreasService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                })
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewArea,
            SaveArea,
            DeleteArea
        ]
    )
}

export default useAreaViewModel;