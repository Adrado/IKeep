import { useContext, useEffect} from 'react';
import { CategoryService } from '../../providers/Providers';
//import {Functions} from '../../providers/Providers';

const useCategoryViewModel = (OnModified, Select) =>
{
    const CategorysService = useContext(CategoryService);
    //const OnModified = useContext(Functions);
    const SaveCategory = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;

        
        if(model !== undefined || model!== null)
        {
            CategorysService.UpdateAsync(model)
            .then((response) => {
                OnModified();
                Select();
            });
        }
    }
        
    const AddNewCategory = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
 
        if(model !== undefined || model!== null)
        {
            CategorysService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                    Select();
                });
        }
    }
 
    const DeleteCategory = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            CategorysService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                    Select();
                })
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewCategory,
            SaveCategory,
            DeleteCategory
        ]
    )
}

export default useCategoryViewModel;