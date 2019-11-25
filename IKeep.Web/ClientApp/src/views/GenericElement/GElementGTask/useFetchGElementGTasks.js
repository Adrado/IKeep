import { useContext, useState, useEffect } from "react"
import { GElementGTaskService } from "../../../providers/Providers"
import GenericElementGenericTask from "../../../models/GenericElementGenericTask";

const useGElementGTasks = (id, update) =>
{
    const GElementGTasksService = useContext(GElementGTaskService)
    const [tasks, setTasks] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let gElementGTasks = []; 
        for (let i in data)
        {
            let gElementGTask = new GenericElementGenericTask(data[i]);
            
            //if(genericElement.EntityStatus !== 0)  
            gElementGTasks.push(gElementGTask);
        }
        data = gElementGTasks;
        return data;
    }

    useEffect(() =>
    {
        const GetById = async () =>
        {
            try{
                const response = await GElementGTasksService.GetById(id);
                console.log(response);
                const dataUpdated = UpdateData(response.data)
                setTasks(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }
        if(id !== null && id !== undefined)
        {
            GetById();
        }

    },[id, GElementGTasksService, change, update]);

    return{
        tasks,
        error,
        change,
        setChange
    }
}

export default useGElementGTasks;