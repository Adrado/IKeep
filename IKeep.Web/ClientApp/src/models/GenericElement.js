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
            this.ElementTypeName = json.elementTypeName;

            this.ElementsIds = json.elementsIds;
            /* this.GenericElementGenericChoresIds = json.genericElementGenericChoresIds;
            this.GenericChoresIds = json.genericChoresIds; */
            this.GenericElementGenericChores = json.genericElementGenericChores;
        }
        else
        {
            this.Name = "";
            this.ElementTypeId = "";
            this.ElementTypeName = "";
            this.ElementsIds = [];
            /* this.GenericElementGenericChoresIds = [];
            this.GenericChoresIds = []; */
            this.GenericElementGenericChores = [];
        }
    }
}

export default GenericElement;