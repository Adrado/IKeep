import { useContext, useEffect} from 'react';
import { UserService } from '../../providers/Providers';
import User from '../../models/User';

const useUserViewModel = () =>
{
    const UsersService = useContext(UserService);

    const AddNewUser = (values) =>
    {
        let user = new User();
        user.LoginName = values.LoginName;
        user.Password = values.Password;
        user.Name = values.Name;
        user.FirstSurname = values.FirstSurname;
        user.SecondSurname = values.SecondSurname;
        user.DNI = values.DNI;
        user.Phone = values.Phone;
        user.Phone2 = values.Phone2;
        user.Email = values.Email;
        user.Birthplace = values.Birthplace;
        user.Birthdate = values.Birthdate;
        user.City = values.City;
        user.Address = values.Address;
        //user.RoleId = values.RoleId;

        if(user !== undefined && user!== null)
        {
            return UsersService.AddAsync(user);
        }
    }

    const SaveUser = (user, values) =>
    {
        user.LoginName = values.LoginName;
        user.Password = values.Password;
        user.Name = values.Name;
        user.FirstSurname = values.FirstSurname;
        user.SecondSurname = values.SecondSurname;
        user.DNI = values.DNI;
        user.Phone = values.Phone;
        user.Phone2 = values.Phone2;
        user.Email = values.Email;
        user.Birthplace = values.Birthplace;
        user.Birthdate = values.Birthdate;
        user.City = values.City;
        user.Address = values.Address;
        //user.RoleId = values.RoleId;

        if(user !== undefined && user !== null)
        {
            return UsersService.UpdateAsync(user);
        }
    }
      
    
    const DeleteUser = (model) =>
    {
        if(model !== undefined && model!== null)
        {
            return UsersService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewUser,
            SaveUser,
            DeleteUser
        ]
    )
}

export default useUserViewModel;