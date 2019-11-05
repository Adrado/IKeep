import  { useState, useEffect, useContext } from 'react';
import {Services} from '../../providers/Providers';
import ElementType from '../../models/ElementType';

const useFetchElementType = () =>
{
    const [fetchedElementType, setFetchedElementType] = useState(null);
    const [error, setError] = useState(false);
    const ElementTypesService = useContext(Services);

    useEffect(() =>
    {
        const GetAllElementTypes = async () =>
        {
            try{
                const response = await ElementTypesService.GetAllAsync();
                let elementTypes = []; 
                for (let i in response.data)
                {
                    let elementType = new ElementType(response.data[i]);
                    
                    if(elementType.EntityStatus !== 0)  
                        elementTypes.push(elementType);
                }
                setFetchedElementType(elementTypes);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllElementTypes();

    },[ElementTypesService]);

    return{
        fetchedElementType,
        error
    }
}

export default useFetchElementType;