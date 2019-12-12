//Hooks
import  { useState, useEffect, useContext } from 'react';

//CRUD Service
import {CategoryService} from '../../providers/Providers';

//Model
import Category from '../../models/Category';

const useFetchCategory = () =>
{
    const CategorysService = useContext(CategoryService);
    const [Categories, setCategories] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let categories = []; 
        for (let i in data)
        {
            let category = new Category(data[i]);
            
            //if(category.EntityStatus !== 0)  
            categories.push(category);
        }
        data = categories;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllCategorys = async () =>
        {
            try{
                const response = await CategorysService.GetAllAsync();
                if(isSuscribed === true)
                {
                    const dataUpdated = UpdateData(response.data)
                    dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                    setCategories(dataUpdated);
                }
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllCategorys();

        return () => {
            isSuscribed = false;
        };

    },[CategorysService, change]);

    return{
        Categories,
        error,
        change,
        setChange
    }
}

export default useFetchCategory;