import  { useState, useEffect, useContext } from 'react';
import {InstallationService} from '../../providers/Providers';
import Installation from '../../models/Installation';

const useFetchInstallations = () =>
{
    const InstallationsService = useContext(InstallationService);
    const [Installations, setInstallations] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let installations = []; 
        for (let i in data)
        {
            let installation = new Installation(data[i]);
            //if(installation.EntityStatus !== 0)  
            installations.push(installation);
        }
        data = installations;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllInstallations = async () =>
        {
            try
            {
                const response = await InstallationsService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                setInstallations(dataUpdated);
            }
            catch (error){
                setError(true)
                console.log(error);
            } 
        }

        GetAllInstallations();

        return () => {
            isSuscribed = false;
        };

    },[InstallationsService, change]);

    return{
        Installations,
        error,
        change,
        setChange
    }
}

export default useFetchInstallations;