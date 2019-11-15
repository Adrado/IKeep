import  { useState, useEffect, useContext } from 'react';
import {FormatService} from '../../providers/Providers';
import Format from '../../models/Format';

const useFetchFormat = () =>
{
    //CRUD services
    const FormatsService = useContext(FormatService);

    const [fetchedFormat, setFetchedFormat] = useState(null);
    const [error, setError] = useState(false);
    
    const [update, setUpdate] = useState(null);

    const UpdateData = (data) =>
    {
        let formats = []; 
        for (let i in data)
        {
            let format = new Format(data[i]);
            
            //if(format.EntityStatus !== 0)  
            formats.push(format);
        }
        data = formats;
        return data;
    }

    const onModify = () =>
    {
        let x = Math.floor(Math.random() * (1000 - 1)) + 1;
        setUpdate(x);
    }

    useEffect(() =>
    {
        const GetAllFormats = async () =>
        {
            try{
                const response = await FormatsService.GetAllAsync();
                const dataUpdated = UpdateData(response.data);
                console.log(dataUpdated);
                setFetchedFormat(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllFormats();

    },[update]);

    return{
        fetchedFormat,
        error,
        onModify
    }
}

export default useFetchFormat;