import { useContext, useEffect} from 'react';
import { CategoryService } from '../../providers/Providers';
import Category from '../../models/Category';

const useCategoryViewModel = () =>
{
    const CategoriesService = useContext(CategoryService);

    const SaveCategory = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId; 

        if(model !== undefined || model!== null)
        {
            return CategoriesService.UpdateAsync(model);
        }
    }
      
    const AddNewCategory = (values) =>
    {
        let category = new Category();
        category.Ref = values.Ref;
        category.Name = values.Name;
        category.ElementTypeId = values.ElementTypeId; 
 
        if(category !== undefined || category!== null)
        {
            return CategoriesService.AddAsync(category);
        }
    }
 
    const DeleteCategory = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return CategoriesService.DeleteAsync(model.Id);
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