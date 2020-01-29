import  { useState, useEffect, useContext } from 'react';
import {MediaService} from '../../providers/Providers';
import MultimediaDto from '../../services/dtos/MultimediaDto';

const useFetchFloorMaps = (floorId) =>
{
    const [MultimediaDtos, setMultimediaDtos] = useState(null)
    const [error, setError] = useState(false);
    const MultimediaService = useContext(MediaService);

    const UpdateData = (data) =>
    {
        let multimediaDtos = []; 
        for (let i in data)
        {
            let multimediaDto = new MultimediaDto(data[i]);
            //if(multimediaDto.EntityStatus !== 0)  
            multimediaDtos.push(multimediaDto);
        }
        data = multimediaDtos;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllMultimediaDtos = async () =>
        {
            try{
                const response = await MultimediaService.GetByIdAsync(floorId);
                if(isSuscribed)
                {
                    console.log(response);
                    const dataUpdated = UpdateData(response.data)
                    dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                    setMultimediaDtos(dataUpdated);
                    console.log(dataUpdated);
                }
            }
            catch (error){
                //console.log(error)
                setError(true)
            } 
        }

        GetAllMultimediaDtos();

        return () => {
            isSuscribed = false;
        };

    },[MediaService, floorId]);

    return{
        MultimediaDtos,
        error
    }
}

export default useFetchFloorMaps;