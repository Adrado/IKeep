import  { useState, useEffect, useContext } from 'react';
import {ElementService} from '../../../providers/Providers';

const useFetchElementsNum = (gElementId) =>
{
    const ElementsService = useContext(ElementService);
    const [numElements, setNumElements] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

   
    useEffect(() =>
    {
        let isSuscribed = true;
        const GetNumElementsByGElementId = async () =>
        {
            try
            {
                const response = await ElementsService.GetNumByElementIdAsync(gElementId);
                if( isSuscribed)
                { 
                    setNumElements(response.data);
                }
            }
            catch (error){
                setError(true)
            } 
        }

        GetNumElementsByGElementId();

        return () => {
            isSuscribed = false;
        };

    },[ElementsService, change, gElementId]);

    return{
        numElements,
        error,
        change,
        setChange
    }
}

export default useFetchElementsNum;