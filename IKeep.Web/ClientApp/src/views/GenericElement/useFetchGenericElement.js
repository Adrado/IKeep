import  { useState, useEffect, useContext } from 'react';
import {GenericElementService} from '../../providers/Providers';
import GenericElement from '../../models/GenericElement';

const useFetchGenericElement = () =>
{
    const GenericElementsService = useContext(GenericElementService);
    const [GElements, setGElements] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let genericElements = []; 
        for (let i in data)
        {
            let genericElement = new GenericElement(data[i]);
            
            //if(genericElement.EntityStatus !== 0)  
            genericElements.push(genericElement);
        }
        data = genericElements;
        return data;
    }

    useEffect(() =>
    {
        const GetAllGenericElements = async () =>
        {
            try{
                const response = await GenericElementsService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                setGElements(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllGenericElements();

    },[GenericElementsService, change]);

    return{
        GElements,
        error,
        change,
        setChange
    }
}

export default useFetchGenericElement;