import { useContext, useEffect} from 'react';
import { InstallationUserService } from '../../providers/Providers';
import InstallationUser from '../../models/InstallationUser';

const useInstallationUserViewModel = () =>
{
    const InstallationUsersService = useContext(InstallationUserService);

    const AddNewInstallationUser = (installationId, userId, roleId) =>
    {
        let installationUser = new InstallationUser();
        installationUser.InstallationId = installationId;
        installationUser.UserId = userId;
        installationUser.RoleId = roleId;

        if(installationUser !== undefined && installationUser!== null)
        {
            return InstallationUsersService.AddAsync(installationUser);
        }
    }

    const SaveInstallationUser = (installationUser, values) =>
    {
        installationUser.EntityStatus = values.EntityStatus
        installationUser.RoleId = values.RoleId;

        if(installationUser !== undefined && installationUser !== null)
        {
            return InstallationUsersService.UpdateAsync(installationUser);
        }
    }
      
    
    const DeleteInstallationUser = (model) =>
    {
        if(model !== undefined && model!== null)
        {
            return InstallationUsersService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewInstallationUser,
            SaveInstallationUser,
            DeleteInstallationUser
        ]
    )
}

export default useInstallationUserViewModel;