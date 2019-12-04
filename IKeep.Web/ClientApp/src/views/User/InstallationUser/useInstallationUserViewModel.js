import { useContext, useEffect} from 'react';
import { InstallationUserService } from '../../providers/Providers';
import InstallationUser from '../../models/InstallationUser';

const useInstallationUserViewModel = () =>
{
    const InstallationUsersService = useContext(InstallationUserService);

    const AddNewInstallationUser = (values) =>
    {
        let installationUser = new InstallationUser();
        installationUser.LoginName = values.LoginName;
        installationUser.Password = values.Password;
        installationUser.Name = values.Name;
        installationUser.FirstSurname = values.FirstSurname;
        installationUser.SecondSurname = values.SecondSurname;
        installationUser.DNI = values.DNI;
        installationUser.Phone = values.Phone;
        installationUser.Phone2 = values.Phone2;
        installationUser.Email = values.Email;
        installationUser.Birthplace = values.Birthplace;
        installationUser.Birthdate = values.Birthdate;
        installationUser.City = values.City;
        installationUser.Address = values.Address;
        installationUser.RoleId = values.RoleId;

        if(installationUser !== undefined && installationUser!== null)
        {
            return InstallationUsersService.AddAsync(installationUser);
        }
    }

    const SaveInstallationUser = (installationUser, values) =>
    {
        installationUser.LoginName = values.LoginName;
        installationUser.Password = values.Password;
        installationUser.Name = values.Name;
        installationUser.FirstSurname = values.FirstSurname;
        installationUser.SecondSurname = values.SecondSurname;
        installationUser.DNI = values.DNI;
        installationUser.Phone = values.Phone;
        installationUser.Phone2 = values.Phone2;
        installationUser.Email = values.Email;
        installationUser.Birthplace = values.Birthplace;
        installationUser.Birthdate = values.Birthdate;
        installationUser.City = values.City;
        installationUser.Address = values.Address;
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