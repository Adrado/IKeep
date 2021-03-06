//Hooks
import  { useState, useEffect, useContext } from 'react';

//CRUD Service
import {PrevMaintenanceService} from '../../providers/ProviderMaintenance';

//Model
import Chore from '../../models/Chore';
import MaintenanceRequest from '../../services/dtos/MaintenanceRequest';

const useFetchCurrentChoresForToday = (id) =>
{
    const PrevMaintenanceServices = useContext(PrevMaintenanceService);
    const [Chores, SetChores] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let chores = []; 
        for (let i in data)
        {
            let chore = new Chore(data[i]);
            chores.push(chore);
        }
        data = chores;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllChores = async () =>
        {
            try{
                let request = new MaintenanceRequest(id);
                const response = await PrevMaintenanceServices.GetCurrentChores(request);
                if(isSuscribed === true)
                {
                    console.log(response.data);
                    //const dataUpdated = UpdateData(response.data)
                    //dataUpdated.sort((a,b) => (a.Description > b.Description) ? 1 : ((b.Description > a.Description) ? -1 : 0));
                    SetChores(response.data);
                }
            }
            catch (error){
                setError(true)
                console.log(error)
            } 
        }

        GetAllChores();

        return () => {
            isSuscribed = false;
        };

    },[PrevMaintenanceServices, change, id]);

    return{
        Chores,
        error,
        change,
        setChange
    }
}

export default useFetchCurrentChoresForToday;