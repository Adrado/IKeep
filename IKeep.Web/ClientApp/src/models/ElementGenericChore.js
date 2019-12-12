import Entity from './Entity'

class ElementGenericChore extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.ElementId = json.elementId;
            this.GenericChoreId = json.genericChoreId;
            this.Status = json.status;
            this.ElementName = json.generiElementName;
            this.GenericChoreDescription = json.genericChoreDescription;
        }
        else
        {
            this.ElementId = "";
            this.GenericChoreId = "";
            this.Status = 1;
            this.ElementName = "";
            this.GenericChoreDescription = "";
        }
        
    }
}

export default ElementGenericChore;