import  { useState, useEffect, useContext } from 'react';
import {InstallationUserService} from '../../../../providers/Providers';
import InstallationUser from '../../../../models/InstallationUser';

const useFetchInstallationUsers = (installationId) =>
{
    const InstallationUsersService = useContext(InstallationUserService);
    const [InstallationUsers, setInstallationUsers] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let installationUsers = []; 
        for (let i in data)
        {
            let installationUser = new InstallationUser(data[i]);
            //if(installationUser.EntityStatus !== 0)  
            installationUsers.push(installationUser);
        }
        data = installationUsers;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetInstallationUsersByAreaId = async () =>
        {
            try
            {
                const response = await InstallationUsersService.GetByInstallationIdAsync(installationId);
                if(isSuscribed)
                {
                    const dataUpdated = UpdateData(response.data)
                    dataUpdated.sort((a,b) => (a.UserName > b.UserName) ? 1 : ((b.UserName > a.UserName) ? -1 : 0)); 
                    setInstallationUsers(dataUpdated);
                }
            }
            catch (error){
                setError(true)
            } 
        }

        GetInstallationUsersByAreaId();

        return () => {
            isSuscribed = false;
        };

    },[InstallationUsersService, change, installationId]);

    return{
        InstallationUsers,
        error,
        change,
        setChange
    }
}

export default useFetchInstallationUsers;