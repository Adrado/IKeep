import  { useState, useEffect, useContext } from 'react';
import {GenericTaskService} from '../../providers/Providers';
import GenericTask from '../../models/GenericTask';

const useFetchGenericTask = () =>
{
    const [fetchedGenericTask, setFetchedGenericTask] = useState(null);
    const [error, setError] = useState(false);
    const GenericTasksService = useContext(GenericTaskService);
    const [update, setUpdate] = useState(null);

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

    const onModify = () =>
    {
        let x = Math.floor(Math.random() * (1000 - 1)) + 1;
        setUpdate(x);
    }

    useEffect(() =>
    {
        const GetAllGenericTasks = async () =>
        {
            try{
                const response = await GenericTasksService.GetAllAsync();
                const dataUpdated = UpdateData(response.data);
                console.log(dataUpdated);
                setFetchedGenericTask(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllGenericTasks();

    },[update]);

    return{
        fetchedGenericTask,
        error,
        onModify
    }
}

export default useFetchGenericTask;