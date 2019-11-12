import { useContext, useEffect} from 'react';
import { Services } from '../../../providers/Providers';
import {Functions} from '../../../providers/Providers';


const useAreaViewModel = () =>
{
    // REST methods
    const AreasService = useContext(Services);
    
    // Function to update TreeView
    const OnModified = useContext(Functions);

    /**
     * REST methods
     * @param {Area} model
     * @param {object} formValues
     */
    const SaveArea = (model, formValues) =>
    {
        model.Ref = formValues.Ref;
        model.Name = formValues.Name;
        model.Description = formValues.Description;
        
        if(model !== undefined || model!== null)
        {
            AreasService.UpdateAsync(model)
            .then((response) => {
                OnModified();
            });
        }
    }
        
    const AddNewArea = (model, formValues) =>
    {
        model.Ref = formValues.Ref;
        model.Name = formValues.Name;
        model.Description = formValues.Description;
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