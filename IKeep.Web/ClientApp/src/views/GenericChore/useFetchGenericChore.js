import  { useState, useEffect, useContext } from 'react';
import {GenericChoreService} from '../../providers/Providers';
import GenericChore from '../../models/GenericChore';

const useFetchGenericChore = () =>
{
    const GenericChoresService = useContext(GenericChoreService);
    const [GChores, setGChores] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let genericChores = []; 
        for (let i in data)
        {
            let genericChore = new GenericChore(data[i]);
            
            //if(genericChore.EntityStatus !== 0)  
            genericChores.push(genericChore);
        }
        data = genericChores;
        return data;
    }

    useEffect(() =>
    {
        const GetAllGenericChores = async () =>
        {
            try{
                const response = await GenericChoresService.GetAllAsync();
                console.log(response.data);
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Description > b.Description) ? 1 : ((b.Description > a.Description) ? -1 : 0)); 
                setGChores(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllGenericChores();

    },[GenericChoresService, change]);

    return{
        GChores,
        error,
        change,
        setChange
    }
}

export default useFetchGenericChore;