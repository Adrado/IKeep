import Entity from './Entity'

class Priority extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Name = json.name;
            this.GenericTasksIds = json.genericTasksIds;
        }
        else
        {
            this.Name = "";
            this.GenericTasksIds = [];
        }

    }
}

export default Priority;