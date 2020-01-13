import  { useState, useEffect, useContext } from 'react';
import {InstallationService} from '../../providers/Providers';
import Installation from '../../models/Installation';

const useFetchInstallations = () =>
{
    const [Installations, setInstallations] = useState(null)
    const [error, setError] = useState(false);
    const InstallationsService = useContext(InstallationService);

    const UpdateData = (data) =>
    {
        let roles = []; 
        for (let i in data)
        {
            let role = new Installation(data[i]);
            //if(role.EntityStatus !== 0)  
            roles.push(role);
        }
        data = roles;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllInstallations = async () =>
        {
            try{
                const response = await InstallationsService.GetAllAsync();
                if(isSuscribed)
                {
                    const dataUpdated = UpdateData(response.data)
                    dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                    setInstallations(dataUpdated);
                }
            }
            catch (error){
                //console.log(error)
                setError(true)
            } 
        }

        GetAllInstallations();

        return () => {
            isSuscribed = false;
        };

    },[InstallationsService]);

    return{
        Installations,
        error
    }
}

export default useFetchInstallations;