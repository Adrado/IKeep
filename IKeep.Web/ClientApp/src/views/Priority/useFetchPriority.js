import  { useState, useEffect, useContext } from 'react';
import {PriorityService} from '../../providers/Providers';
import Priority from '../../models/Priority';

const useFetchPriority = () =>
{
    //CRUD services
    const PrioritysService = useContext(PriorityService);

    const [fetchedPriority, setFetchedPriority] = useState(null);
    const [error, setError] = useState(false);
    
    const [update, setUpdate] = useState(null);

    const UpdateData = (data) =>
    {
        let prioritys = []; 
        for (let i in data)
        {
            let priority = new Priority(data[i]);
            
            //if(priority.EntityStatus !== 0)  
            prioritys.push(priority);
        }
        data = prioritys;
        return data;
    }

    const onModify = () =>
    {
        let x = Math.floor(Math.random() * (1000 - 1)) + 1;
        setUpdate(x);
    }

    useEffect(() =>
    {
        const GetAllPrioritys = async () =>
        {
            try{
                const response = await PrioritysService.GetAllAsync();
                const dataUpdated = UpdateData(response.data);
                console.log(dataUpdated);
                setFetchedPriority(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllPrioritys();

    },[update]);

    return{
        fetchedPriority,
        error,
        onModify
    }
}

export default useFetchPriority;