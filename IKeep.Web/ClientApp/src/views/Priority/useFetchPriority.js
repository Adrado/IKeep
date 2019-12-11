import  { useState, useEffect, useContext } from 'react';
import {PriorityService} from '../../providers/Providers';
import Priority from '../../models/Priority';

const useFetchPriority = () =>
{
    const PrioritysService = useContext(PriorityService);
    const [Priorities, setPriorities] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let priorities = []; 
        for (let i in data)
        {
            let priority = new Priority(data[i]);
            
            //if(priority.EntityStatus !== 0)  
            priorities.push(priority);
        }
        data = priorities;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllPrioritys = async () =>
        {
            try{
                const response = await PrioritysService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                setPriorities(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllPrioritys();

        return () => {
            isSuscribed = false;
        };
    },[PrioritysService, change]);

    return{
        Priorities,
        error,
        change,
        setChange
    }
}

export default useFetchPriority;