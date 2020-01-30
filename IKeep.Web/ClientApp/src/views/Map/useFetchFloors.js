import  { useState, useEffect, useContext } from 'react';
import {FloorService} from '../../providers/Providers';
import Floor from '../../models/Floor';

const useFetchFloors = (buildingId) =>
{
    const [Floors, setFloors] = useState(null)
    const [error, setError] = useState(false);
    const FloorsService = useContext(FloorService);

    const UpdateData = (data) =>
    {
        let floors = []; 
        for (let i in data)
        {
            let floor = new Floor(data[i]);
            //if(floor.EntityStatus !== 0)  
            floors.push(floor);
        }
        data = floors;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllFloors = async () =>
        {
            try{
                const response = await FloorsService.GetFloorsOfBuilding(buildingId);
                if(isSuscribed)
                {
                    const dataUpdated = UpdateData(response.data)
                    dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                    setFloors(dataUpdated);
                }
            }
            catch (error){
                //console.log(error)
                setError(true)
            } 
        }

        GetAllFloors();

        return () => {
            isSuscribed = false;
        };

    },[FloorsService, buildingId]);

    return{
        Floors,
        error
    }
}

export default useFetchFloors;