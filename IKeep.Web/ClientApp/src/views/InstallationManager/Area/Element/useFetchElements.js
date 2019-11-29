import  { useState, useEffect, useContext } from 'react';
import {ElementService} from '../../../../providers/Providers';
import Element from '../../../../models/Element';

const useFetchElements = (areaId) =>
{
    const ElementsService = useContext(ElementService);
    const [Elements, setElements] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let elements = []; 
        for (let i in data)
        {
            let element = new Element(data[i]);
            //if(element.EntityStatus !== 0)  
            elements.push(element);
        }
        console.log(elements)
        data = elements;
        return data;
    }

    useEffect(() =>
    {
        const GetElementsByAreaId = async () =>
        {
            try
            {
                const response = await ElementsService.GetById(areaId);
                console.log(response.data);
                const dataUpdated = UpdateData(response.data)
                console.log(dataUpdated)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                console.log(dataUpdated)
                setElements(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetElementsByAreaId();

    },[ElementsService, change, areaId]);

    return{
        Elements,
        error,
        change,
        setChange
    }
}

export default useFetchElements;