
// React Hooks
import  { useState, useEffect, useContext } from 'react';

//CRUD Services
import {ChoreService} from '../../providers/Providers';
//import Chore from '../../models/Chore';

const useFetchChores = (id) =>
{
    const ChoresService = useContext(ChoreService);
    const [Chores, setChores] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    /* const UpdateData = (data) =>
    {
        let chores = []; 
        for (let i in data)
        {
            let chore = new Chore(data[i]);
            //if(chore.EntityStatus !== 0)  
            chores.push(chore);
        }
        data = chores;
        return data;
    } */

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllChores = async () =>
        {
            try
            {
                const response = await ChoresService.GetAllAsync(id)
                //console.log(response);
                //console.log(response.data);
                if (isSuscribed)
                {
                    //const dataUpdated = UpdateData(response.data)
                   // dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                    setChores(response.data);
                }
                
            }
            catch (error){
                setError(true)
                console.log(error);
            } 
        }

        GetAllChores();

        return () => {
            isSuscribed = false;
        };

    },[ChoresService, change, id]);

    return{
        Chores,
        error,
        change,
        setChange
    }
}

export default useFetchChores;