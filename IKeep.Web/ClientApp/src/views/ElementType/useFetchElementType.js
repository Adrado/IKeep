import  { useState, useEffect, useContext } from 'react';
import {ElementTypeService} from '../../providers/Providers';
import ElementType from '../../models/ElementType';

const useFetchElementType = () =>
{
    const ElementTypesService = useContext(ElementTypeService);
    const [ETypes, setETypes] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

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
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                //console.log(dataUpdated);
                setETypes(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllElementTypes();

    },[ElementTypesService, change]);

    return{
        ETypes,
        error,
        change,
        setChange
    }
}

export default useFetchElementType;