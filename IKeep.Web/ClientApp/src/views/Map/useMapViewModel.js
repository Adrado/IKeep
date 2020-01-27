import { useContext, useEffect} from 'react';
import { MapService } from '../../providers/Providers';
import Map from '../../models/Map';

const useMapViewModel = () =>
{
    const MapsService = useContext(MapService);

    const AddNewMap = (values) =>
    {
        var map = new Map();

        if(map !== undefined && map!== null)
        {
            return MapsService.AddAsync(map);
        }
    }

    const SaveMap = (map, values) =>
    {
       

        if(map !== undefined && map !== null)
        {
            return MapsService.UpdateAsync(map);
        }
    }
      
    
    const DeleteMap = (model) =>
    {
        if(model !== undefined && model!== null)
        {
            return MapsService.DeleteAsync(model.Id);
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