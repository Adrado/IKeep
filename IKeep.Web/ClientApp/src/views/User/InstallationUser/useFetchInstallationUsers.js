import  { useState, useEffect, useContext } from 'react';
import {InstallationUserService} from '../../providers/Providers';
import InstallationUser from '../../models/InstallationUser';

const useFetchInstallationUsers = () =>
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
        const GetAllInstallationUsers = async () =>
        {
            try
            {
                const response = await InstallationUsersService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                setInstallationUsers(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllInstallationUsers();
        
        return () => {
            InstallationUsersService.CancelOperation();
        };

    },[InstallationUsersService, change]);

    return{
        InstallationUsers,
        error,
        change,
        setChange
    }
}

export default useFetchInstallationUsers;