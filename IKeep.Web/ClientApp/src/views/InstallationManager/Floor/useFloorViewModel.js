import { useContext, useEffect} from 'react';
import { Services } from '../../../providers/Providers';
import {Functions} from '../../../providers/Providers';

const useFloorViewModel = () =>
{
    const FloorsService = useContext(Services);
    const OnModified = useContext(Functions);
    const SaveFloor = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.Description = values.Description;
        
        if(model !== undefined || model!== null)
        {
            FloorsService.UpdateAsync(model)
            .then((response) => {
                OnModified();
            });
        }
    }
        
    const AddNewFloor = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.Description = values.Description;
        if(model !== undefined || model!== null)
        {
            FloorsService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                });
        }
    }
 
    const DeleteFloor = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            FloorsService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                })
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewFloor,
            SaveFloor,
            DeleteFloor
        ]
    )
}

export default useFloorViewModel;