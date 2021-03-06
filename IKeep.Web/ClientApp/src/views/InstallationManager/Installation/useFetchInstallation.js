import  { useState, useEffect, useContext } from 'react';
import {Services} from '../../../providers/Providers';
import Installation from '../../../models/Installation';

const useFetchInstallation = (treeNode) =>
{
    const [fetchedInstallation, setFetchedInstallation] = useState(null)
    const [error, setError] = useState(false);
    const InstallationsService = useContext(Services);

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetInstallation = async () =>
        {
            try{
                const response = await InstallationsService.GetByIdAsync(treeNode.Id);
                if(isSuscribed)
                {
                    const installation = new Installation(response.data);
                    setFetchedInstallation(installation);
                }
            }
            catch (error){
                //console.log(error)
                setError(true)
            } 
        }

        const NewInstallation = () =>
        {
            const installation = new Installation()
            //installation.FloorId = treeNode.ParentId;
            setFetchedInstallation(installation);
        }

        if(treeNode.Id !== null)
        {
            GetInstallation();
        }

        if(treeNode.Id === null)
        {
            NewInstallation();
        }

        return () => {
            isSuscribed = false;
        };

    },[treeNode, InstallationsService]);

    return{
        fetchedInstallation,
        error
    }
}

export default useFetchInstallation;