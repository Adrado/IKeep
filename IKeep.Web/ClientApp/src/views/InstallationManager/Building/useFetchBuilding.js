import  { useState, useEffect, useContext } from 'react';
import {Services} from '../../../providers/Providers';
import Building from '../../../models/Building';

const useFetchBuilding = (treeNode) =>
{
    const [fetchedBuilding, setFetchedBuilding] = useState(null)
    const [error, setError] = useState(false);
    const BuildingsService = useContext(Services);

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetBuilding = async () =>
        {
            try{
                const response = await BuildingsService.GetByIdAsync(treeNode.Id);
                if(isSuscribed)
                {
                    const building = new Building(response.data);
                    setFetchedBuilding(building);
                }
                
            }
            catch (error){
                setError(true)
            } 
        }

        const NewBuilding = () =>
        {
            const building = new Building()
            building.InstallationId = treeNode.ParentId;
            setFetchedBuilding(building);
        }

        if(treeNode.Id !== null)
        {
            GetBuilding();
        }

        if(treeNode.Id === null)
        {
            NewBuilding();
        }

        return () => {
            isSuscribed = false;
        };

    },[treeNode, BuildingsService]);

    return{
        fetchedBuilding,
        error
    }
}

export default useFetchBuilding;