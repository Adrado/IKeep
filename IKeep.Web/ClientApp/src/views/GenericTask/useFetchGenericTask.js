import  { useState, useEffect, useContext } from 'react';
import {GenericTaskService} from '../../providers/Providers';
import GenericTask from '../../models/GenericTask';

const useFetchGenericTask = () =>
{
    const GenericTasksService = useContext(GenericTaskService);
    const [GTasks, setGTasks] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let genericTasks = []; 
        for (let i in data)
        {
            let genericTask = new GenericTask(data[i]);
            
            //if(genericTask.EntityStatus !== 0)  
            genericTasks.push(genericTask);
        }
        data = genericTasks;
        return data;
    }

    useEffect(() =>
    {
        const GetAllGenericTasks = async () =>
        {
            try{
                const response = await GenericTasksService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Description > b.Description) ? 1 : ((b.Description > a.Description) ? -1 : 0)); 
                setGTasks(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllGenericTasks();

    },[GenericTasksService, change]);

    return{
        GTasks,
        error,
        change,
        setChange
    }
}

export default useFetchGenericTask;