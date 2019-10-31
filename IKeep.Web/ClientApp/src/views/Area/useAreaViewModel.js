import { useContext, useEffect} from 'react';
import { Services } from '../../providers/Providers';

const useAreaViewModel = () =>
{
    const AreasService = useContext(Services);

    const SaveArea = (model, values) =>
    {
        alert("Save")
        model.Ref = values.Ref;
        model.Name = values.Name;
        
        if(model !== undefined || model!== null)
        {
            alert("Save2")
            AreasService.UpdateAsync(model)
            .then((response) => {
                console.log(response)
            });
        }
    }
        
    const AddNewArea = (model, values) =>
    {
        alert("Add")
        model.Ref = values.Ref;
        model.Name = values.Name;
        if(model !== undefined || model!== null)
        {
            alert("Add2")
            AreasService.AddAsync(model)
                .then((response) => { 
                    console.log(response); 
                });
        }
    }
 
    const DeleteArea = (model) =>
    {
        alert("Delete")

        if(model !== undefined || model!== null)
        {
            alert("Delete2")
            AreasService.DeleteAsync(model.Id)
                .then((response) => {
                console.log(response)
                })
        }
    }
    useEffect(() =>
    {
        
    },[])

    return(
        [
            AddNewArea,
            SaveArea,
            DeleteArea
        ]
    )
        
    
}

export default useAreaViewModel;