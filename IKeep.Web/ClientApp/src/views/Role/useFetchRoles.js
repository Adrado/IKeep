import  { useState, useEffect, useContext } from 'react';
import {RoleService} from '../../providers/Providers';
import Role from '../../models/Role';

const useFetchRoles = () =>
{
    const RolesService = useContext(RoleService);
    const [Roles, setRoles] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let roles = []; 
        for (let i in data)
        {
            let role = new Role(data[i]);
            //if(role.EntityStatus !== 0)  
            roles.push(role);
        }
        data = roles;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetAllRoles = async () =>
        {
            try
            {
                const response = await RolesService.GetAllAsync();
                const dataUpdated = UpdateData(response.data)
                dataUpdated.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0)); 
                setRoles(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }

        GetAllRoles();

        return () => {
            isSuscribed = false;
        };

    },[RolesService, change]);

    return{
        Roles,
        error,
        change,
        setChange
    }
}

export default useFetchRoles;