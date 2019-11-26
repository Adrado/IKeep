import  { useState, useEffect, useContext } from 'react';
import {UserService} from '../../providers/Providers';
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
        const GetAllUsers = async () =>
        {
            try
            {
                const response = await UsersService.GetAllAsync();
                console.log(response);
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                setUsers(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllUsers();

    },[UsersService, change]);

    return{
        Users,
        error,
        change,
        setChange
    }
}

export default useFetchUsers;