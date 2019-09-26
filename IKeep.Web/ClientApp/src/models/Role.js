import Entity from './Entity';

class Role extends Entity
{
    constructor()
    {
        super();
        this.Name = "";
        this.RolesIds = [];
    }
}

export default Role;