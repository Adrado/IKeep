import  { useState, useEffect } from 'react';
import InstallationUser from '../../../../models/InstallationUser';

const useTempData = (users, installationId) =>
{
    const [tempData, setTempData] = useState(null);

    useEffect(() =>
    {
        let firstTime = true;
        const UpdateData = (data) =>
        {
            let installationUsers = []; 
            for (let i in data)
            {
                let installationUser = new InstallationUser();
                installationUser.UserId = data[i].Id;
                installationUser.UserName = data[i].Name + " " +data[i].FirstSurname;
                installationUser.InstallationId = installationId;  
                installationUsers.push(installationUser);
            }
            data = installationUsers;
            return data;
        }

        const GetInstallationUsersByAreaId = () =>
        {
            const dataUpdated = UpdateData(users)
            dataUpdated.sort((a,b) => (a.UserName > b.UserName) ? 1 : ((b.UserName > a.UserName) ? -1 : 0)); 
            setTempData(dataUpdated);
        }

        if(users !== null && firstTime)
        {
            GetInstallationUsersByAreaId();
            firstTime = false;
        }
            

    },[users , installationId]);

    return[
        tempData,
        setTempData
    ]
}

export default useTempData;