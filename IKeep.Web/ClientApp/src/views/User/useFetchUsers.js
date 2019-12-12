//React Hooks
import  { useState, useEffect, useContext } from 'react';
//CRUD Services
import {UserService} from '../../providers/Providers';
//Model
import User from '../../models/User';

const useFetchUsers = () =>
{
    const UsersService = useContext(UserService);
    const [Users, setUsers] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let users = []; 
        for (let i in data)
        {
            let user = new User(data[i]);
            //if(user.EntityStatus !== 0)  
            users.push(user);
        }
        data = users;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllUsers = async () =>
        {
            try
            {
                const response = await UsersService.GetAllAsync();
                if (isSuscribed)
                {
                    const dataUpdated = UpdateData(response.data)
                    dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                    setUsers(dataUpdated);
                }
                
            }
            catch (error){
                setError(true)
                console.log(error);
            } 
        }

        GetAllUsers();

        return () => {
            isSuscribed = false;
        };

    },[UsersService, change]);

    return{
        Users,
        error,
        change,
        setChange
    }
}

export default useFetchUsers;