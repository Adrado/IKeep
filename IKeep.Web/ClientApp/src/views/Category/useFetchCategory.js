import  { useState, useEffect, useContext } from 'react';
import {CategoryService} from '../../providers/Providers';
import Category from '../../models/Category';

const useFetchCategory = () =>
{
    //CRUD services
    const CategorysService = useContext(CategoryService);

    const [fetchedCategory, setFetchedCategory] = useState(null);
    const [error, setError] = useState(false);
    
    const [update, setUpdate] = useState(null);

    const UpdateData = (data) =>
    {
        let categorys = []; 
        for (let i in data)
        {
            let category = new Category(data[i]);
            
            //if(category.EntityStatus !== 0)  
            categorys.push(category);
        }
        data = categorys;
        return data;
    }

    const onModify = () =>
    {
        let x = Math.floor(Math.random() * (1000 - 1)) + 1;
        setUpdate(x);
    }

    useEffect(() =>
    {
        const GetAllCategorys = async () =>
        {
            try{
                const response = await CategorysService.GetAllAsync();
                const dataUpdated = UpdateData(response.data);
                console.log(dataUpdated);
                setFetchedCategory(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllCategorys();

    },[update]);

    return{
        fetchedCategory,
        error,
        onModify
    }
}

export default useFetchCategory;