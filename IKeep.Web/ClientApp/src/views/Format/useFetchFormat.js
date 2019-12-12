//React Hooks
import  { useState, useEffect, useContext } from 'react';
//CRUD Service
import {FormatService} from '../../providers/Providers';
//Model
import Format from '../../models/Format';

const useFetchFormat = () =>
{
    const FormatsService = useContext(FormatService);
    const [Formats, setFormats] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

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

    useEffect(() =>
    {
        const GetAllFormats = async () =>
        {
            try{
                const response = await FormatsService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                setFormats(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllFormats();

    },[FormatsService, change]);

    return{
        Formats,
        error,
        change,
        setChange
    }
}

export default useFetchFormat;