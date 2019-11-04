import { useContext, useEffect} from 'react';
import { Services } from '../../../providers/Providers';
import {Functions} from '../../../providers/Providers';

const useBuildingViewModel = () =>
{
    const BuildingsService = useContext(Services);
    const OnModified = useContext(Functions);
    const SaveBuilding = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.Description = values.Description;
        
        if(model !== undefined || model!== null)
        {
            BuildingsService.UpdateAsync(model)
            .then((response) => {
                OnModified();
            });
        }
    }
        
    const AddNewBuilding = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.Description = values.Description;
        if(model !== undefined || model!== null)
        {
            BuildingsService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                });
        }
    }
 
    const DeleteBuilding = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            BuildingsService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                })
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewBuilding,
            SaveBuilding,
            DeleteBuilding
        ]
    )
}

export default useBuildingViewModel;