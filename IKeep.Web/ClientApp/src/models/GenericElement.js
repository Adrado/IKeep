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
            this.ElementTypeName = json.elementTypeName;
            this.GenericElementGenericTasksIds = json.genericElementGenericTasksIds;
        }
        else
        {
            this.Name = "";
            this.ElementTypeId = "";
            this.ElementTypeName = "";
            this.ElementsIds = [];
            this.GenericElementGenericTasksIds = [];
        }
    }
}

export default GenericElement;