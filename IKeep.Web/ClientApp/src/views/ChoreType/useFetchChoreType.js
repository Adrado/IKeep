import  { useState, useEffect, useContext } from 'react';
import {ChoreTypeService} from '../../providers/Providers';
import ChoreType from '../../models/ChoreType';

const useFetchChoreType = () =>
{
    const ChoreTypesService = useContext(ChoreTypeService);
    const [ChoreTypes, setChoreTypes] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let priorities = []; 
        for (let i in data)
        {
            let choreType = new ChoreType(data[i]);
            
            //if(choreType.EntityStatus !== 0)  
            priorities.push(choreType);
        }
        data = priorities;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllChoreTypes = async () =>
        {
            try{
                const response = await ChoreTypesService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                setChoreTypes(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllChoreTypes();

        return () => {
            isSuscribed = false;
        };
    },[ChoreTypesService, change]);

    return{
        ChoreTypes,
        error,
        change,
        setChange
    }
}

export default useFetchChoreType;