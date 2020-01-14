import { useContext, useEffect} from 'react';
import { RoleService } from '../../providers/Providers';
import Role from '../../models/Role';

const useRoleViewModel = () =>
{
    const RolesService = useContext(RoleService);

    const SaveRole = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId; 

        if(model !== undefined && model !== null)
        {
            return RolesService.UpdateAsync(model);
        }
    }
      
    const AddNewRole = (values) =>
    {
        let role = new Role();
        role.Ref = values.Ref;
        role.Name = values.Name;
        role.ElementTypeId = values.ElementTypeId; 
 
        if(role !== undefined && role!== null)
        {
            return RolesService.AddAsync(role);
        }
    }
 
    const DeleteRole = (model) =>
    {
        if(model !== undefined && model!== null)
        {
            return RolesService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewRole,
            SaveRole,
            DeleteRole
        ]
    )
}

export default useRoleViewModel;