import  { useState, useEffect, useContext } from 'react';
import {Services} from '../../../providers/Providers';
import Floor from '../../../models/Floor';

const useFetchFloor = (treeNode) =>
{
    const [fetchedFloor, setFetchedFloor] = useState(null)
    const [error, setError] = useState(false);
    const FloorsService = useContext(Services);

    useEffect(() =>
    {
        const GetFloor = async () =>
        {
            try{
                const response = await FloorsService.GetByIdAsync(treeNode.Id); 
                const floor = new Floor(response.data);
                setFetchedFloor(floor);
            }
            catch (error){
                setError(true)
            } 
        }

        const NewFloor = () =>
        {
            const floor = new Floor()
            floor.BuildingId = treeNode.ParentId;
            setFetchedFloor(floor);
        }

        if(treeNode.Id !== null)
        {
            GetFloor();
        }

        if(treeNode.Id === null)
        {
            NewFloor();
        }

    },[treeNode]);

    return{
        fetchedFloor,
        error
    }
}

export default useFetchFloor;