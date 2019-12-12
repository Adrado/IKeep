import Entity from './Entity'

class GenericElementGenericChore extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.GenericElementId = json.genericElementId;
            this.GenericChoreId = json.genericChoreId;
            this.Status = json.status;
            this.GenericElementName = json.generiElementName;
            this.GenericChoreDescription = json.genericChoreDescription;
        }
        else
        {
            this.GenericElementId = "";
            this.GenericChoreId = "";
            this.Status = 1;
            this.GenericElementName = "";
            this.GenericChoreDescription = "";
        }
        
    }
}

export default GenericElementGenericChore;