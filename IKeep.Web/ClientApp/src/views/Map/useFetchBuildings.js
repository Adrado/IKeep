import  { useState, useEffect, useContext } from 'react';
import {BuildingService} from '../../providers/Providers';
import Building from '../../models/Building';

const useFetchBuildings = (installationId) =>
{
    const [Buildings, setBuildings] = useState(null)
    const [error, setError] = useState(false);
    const BuildingsService = useContext(BuildingService);

    const UpdateData = (data) =>
    {
        let buildings = []; 
        for (let i in data)
        {
            let building = new Building(data[i]);
            //if(building.EntityStatus !== 0)  
            buildings.push(building);
        }
        data = buildings;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllBuildings = async () =>
        {
            try{
                const response = await BuildingsService.GetBuildingsOfInstallation(installationId);
                if(isSuscribed)
                {
                    const dataUpdated = UpdateData(response.data)
                    dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                    setBuildings(dataUpdated);
                }
            }
            catch (error){
                //console.log(error)
                setError(true)
            } 
        }

        GetAllBuildings();

        return () => {
            isSuscribed = false;
        };

    },[BuildingsService, installationId]);

    return{
        Buildings,
        error
    }
}

export default useFetchBuildings;