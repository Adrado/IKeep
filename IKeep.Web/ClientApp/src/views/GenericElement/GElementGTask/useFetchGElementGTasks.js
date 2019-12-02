import { useContext, useState, useEffect } from "react"
import { GElementGTaskService } from "../../../providers/Providers"
import GenericElementGenericTask from "../../../models/GenericElementGenericTask";

const useGElementGTasks = (gElementId, update) =>
{
    const GElementGTasksService = useContext(GElementGTaskService)
    const [GElementGTasks, setGElementGTasks] = useState(null);
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
                const response = await GElementGTasksService.GetById(gElementId);
                console.log(response);
                const dataUpdated = UpdateData(response.data)
                setGElementGTasks(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }
        if(gElementId !== null && gElementId !== undefined)
        {
            GetById();
        }

    },[gElementId, GElementGTasksService, change, update]);

    return{
        GElementGTasks,
        error,
        change,
        setChange
    }
}

export default useGElementGTasks;