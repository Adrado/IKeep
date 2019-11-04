import  { useState, useEffect, useContext } from 'react';
import {Services} from '../../../providers/Providers';
import Area from '../../../models/Area';

const useFetchArea = (treeNode) =>
{
    const [fetchedArea, setFetchedArea] = useState(null)
    const [error, setError] = useState(false);
    const AreasService = useContext(Services);

    useEffect(() =>
    {
        const GetArea = async () =>
        {
            try{
                const response = await AreasService.GetByIdAsync(treeNode.Id); 
                const area = new Area(response.data);
                setFetchedArea(area);
            }
            catch (error){
                setError(true)
            } 
        }

        const NewArea = () =>
        {
            const area = new Area()
            area.FloorId = treeNode.ParentId;
            setFetchedArea(area);
        }

        if(treeNode.Id !== null)
        {
            GetArea();
        }

        if(treeNode.Id === null)
        {
            NewArea();
        }

    },[treeNode]);

    return{
        fetchedArea,
        error
    }
}

export default useFetchArea;