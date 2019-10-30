import {useCallback, useContext } from 'react';
import { Services } from '../../providers/Providers';

const useAreaViewModel = (model) =>
{
    const AreasService = useContext(Services);

    const SaveArea = useCallback ((values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;

        AreasService.UpdateAsync(model)
            .then((response) => {
                console.log(response)
            });

    },[]);
        

    const AddNewArea = useCallback (values =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        
        AreasService.AddAsync(model)
            .then((response) => { 
                console.log(response); 
            });
    },[]);
 
    const DeleteArea = useCallback ( () =>
    {
        AreasService.DeleteAsync(model.Id)
            .then((response) => {
            console.log(response)
            })

    },[]);


    return{
        AddNewArea,
        SaveArea,
        DeleteArea
    }
}

export default useAreaViewModel;