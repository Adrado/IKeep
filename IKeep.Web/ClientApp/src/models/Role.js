import Entity from './Entity';

class Role extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Name = json.name;
            this.RolesIds = json.rolesIds;
        }
        else
        {
            this.Name = "";
            this.RolesIds = [];
        }
    }
}

export default Role;