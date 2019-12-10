import  { useState, useEffect, useContext } from 'react';
import {Services} from '../../../providers/Providers';
import Area from '../../../models/Area';

/**
 * Get Area related with treeNode
 * @param {TreeNode} treeNode
 */
const useFetchArea = (treeNode) =>
{
    const [fetchedArea, setFetchedArea] = useState(null);
    const [error, setError] = useState(false);

    // REST methods
    const AreasService = useContext(Services);

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetArea = async () =>
        {
            try{
                const response = await AreasService.GetByIdAsync(treeNode.Id);
                if(isSuscribed)
                {
                    const area = new Area(response.data);
                    setFetchedArea(area);
                }
                
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
        
        return () => {
            isSuscribed = false;
        };

    },[treeNode, AreasService]);

    return{
        fetchedArea,
        error
    }
}

export default useFetchArea;