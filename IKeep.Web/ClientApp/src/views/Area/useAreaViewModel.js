import {useCallback, useContext, useEffect} from 'react';
import { Services } from '../../providers/Providers';

const useAreaViewModel = () =>
{
    const AreasService = useContext(Services);

    const SaveArea = useCallback((model, values) =>
    {
        alert("Save")
        model.Ref = values.Ref;
        model.Name = values.Name;
        
        if(model !== undefined || model!== null)
        {
            AreasService.UpdateAsync(model)
            .then((response) => {
                console.log(response)
            });
        }

    },[]);
        

    const AddNewArea = useCallback ((model, values) =>
    {
        alert("Add")
        model.Ref = values.Ref;
        model.Name = values.Name;
        
        AreasService.AddAsync(model)
            .then((response) => { 
                console.log(response); 
            });
    },[]);
 
    const DeleteArea = useCallback ( (model) =>
    {
        alert("Delete")
        AreasService.DeleteAsync(model.Id)
            .then((response) => {
            console.log(response)
            })

    },[]);

 /*    useEffect(() =>
    {
        
    },[]) */

    return{
        AddNewArea,
        SaveArea,
        DeleteArea
    }
}

export default useAreaViewModel;