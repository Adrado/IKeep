import  { useState, useEffect, useContext } from 'react';
import {ElementService} from '../../providers/Providers';
import Element from '../../models/Element';

const useFetchInstallationElements = (installationId) =>
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
        data = elements;
        return data;
    }
   
    useEffect(() =>
    {
        let isSuscribed = true;
        const GetElementsByGElementId = async () =>
        {
            try
            {
                const response = await ElementsService.GetAllElementsOfInstallation(installationId);
                console.log(response.data);
                if(isSuscribed)
                { 
                    const dataUpdated = UpdateData(response.data)
                    console.log(response);
                    dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    console.log(dataUpdated);
                    setElements(dataUpdated);
                }
            }
            catch (error){
                setError(true)
                console.log(error)
            } 
        }

        GetElementsByGElementId();

        return () => {
            isSuscribed = false;
        };

    },[ElementsService, change, installationId]);

    return{
        Elements,
        error,
        change,
        setChange
    }
}

export default useFetchInstallationElements;