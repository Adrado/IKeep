import Entity from './Entity'

class GenericElement extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Name = json.name;
            this.ElementTypeId = json.elementTypeId;
            this.ElementsIds = json.elementsIds;
        }
        else
        {
            this.Name = "";
            this.ElementTypeId = "";
            this.ElementsIds = [];
        }
    }
}

export default GenericElement;