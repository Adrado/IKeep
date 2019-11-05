import  { useState, useEffect, useContext } from 'react';
import {Services} from '../../providers/Providers';
import ElementType from '../../models/ElementType';

const useFetchElementType = () =>
{
    const [fetchedElementType, setFetchedElementType] = useState(null);
    const [error, setError] = useState(false);
    const ElementTypesService = useContext(Services);

    const UpdateData = (data) =>
    {
        let elementTypes = []; 
        for (let i in data)
        {
            let elementType = new ElementType(data[i]);
            
            //if(elementType.EntityStatus !== 0)  
            elementTypes.push(elementType);
        }
        data = elementTypes;
        return data;
    }
    useEffect(() =>
    {
        const GetAllElementTypes = async () =>
        {
            try{
                const response = await ElementTypesService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                setFetchedElementType(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllElementTypes();

    },[]);

    return{
        fetchedElementType,
        error
    }
}

export default useFetchElementType;