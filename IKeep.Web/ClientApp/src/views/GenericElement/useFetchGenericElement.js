import  { useState, useEffect, useContext } from 'react';
import {GenericElementService, GElementGTaskService} from '../../providers/Providers';
import GenericElement from '../../models/GenericElement';

const useFetchGenericElement = () =>
{
    const [fetchedGenericElement, setFetchedGenericElement] = useState(null);
    const [error, setError] = useState(false);
    const GenericElementsService = useContext(GenericElementService);
    const GElementGTasksService = useContext(GElementGTaskService);
    const [update, setUpdate] = useState(null);

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

    const onModify = () =>
    {
        let x = Math.floor(Math.random() * (1000 - 1)) + 1;
        setUpdate(x);
    }

    useEffect(() =>
    {
        const GetAllGenericElements = async () =>
        {
            try{
                const response = await GenericElementsService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                console.log(dataUpdated);
                setFetchedGenericElement(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllGenericElements();

    },[update]);

    return{
        fetchedGenericElement,
        error,
        onModify
    }
}

export default useFetchGenericElement;