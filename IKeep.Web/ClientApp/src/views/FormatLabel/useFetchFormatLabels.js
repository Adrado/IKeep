//React Hooks
import  { useState, useEffect, useContext } from 'react';
//CRUD Service
import {FormatLabelService} from '../../providers/Providers';
//Model
import FormatLabel from '../../models/FormatLabel';

const useFetchFormatLabels = () =>
{
    const FormatLabelsService = useContext(FormatLabelService);
    const [FormatLabels, setFormatLabels] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let formats = []; 
        for (let i in data)
        {
            let format = new FormatLabel(data[i]);
            
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
                const response = await FormatLabelsService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                setFormatLabels(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllFormats();

    },[FormatLabelsService, change]);

    return{
        FormatLabels,
        error,
        change,
        setChange
    }
}

export default useFetchFormatLabels;