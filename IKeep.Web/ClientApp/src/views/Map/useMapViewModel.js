import { useContext, useEffect} from 'react';
import { MediaService } from '../../providers/Providers';
import Map from '../../models/Map';
import MultimediaDto from '../../services/dtos/MultimediaDto';


const useMapViewModel = () =>
{
    const MultimediaService = useContext(MediaService);

    const AddNewMap = (values, floorId, imageBase64) =>
    {
        var multimediaDto = new MultimediaDto;
        multimediaDto.Name = values.Name;
        multimediaDto.Description = values.Description;
        multimediaDto.ParentId = floorId;
        multimediaDto.Base64 = imageBase64;

        if(multimediaDto !== undefined && multimediaDto!== null)
        {
            return MultimediaService.AddAsync(multimediaDto);
        }
    }

    const SaveMap = (map, values) =>
    {
       

        if(map !== undefined && map !== null)
        {
            return MultimediaService.UpdateAsync(map);
        }
    }
      
    
    const DeleteMap = (model) =>
    {
        if(model !== undefined && model!== null)
        {
            return MultimediaService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewMap,
            SaveMap,
            DeleteMap
        ]
    )
}

export default useMapViewModel;