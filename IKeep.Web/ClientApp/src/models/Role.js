import Entity from './Entity';

class Role extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Name = json.name;
            this.UsersIds = json.usersIds;
        }
        else
        {
            this.Name = "";
            this.UsersIds = [];
        }
    }
}

export default Role;