import Entity from './Entity'

class ChoreType extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Name = json.name;
            this.GenericChoresIds = json.genericChoresIds;
        }
        else
        {
            this.Name = "";
            this.GenericChoresIds = [];
        }

    }
}

export default ChoreType;