import Entity from './Entity'

class GenericElement extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Ref = json.ref;
            this.Name = json.name;
            this.ElementTypeId = json.elementTypeId;
        }
        else
        {
            this.Ref = "";
            this.Name = "";
            this.ElementTypeId = "";
        }
    }
}

export default GenericElement;