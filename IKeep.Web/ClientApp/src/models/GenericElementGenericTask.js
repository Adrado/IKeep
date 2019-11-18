import Entity from './Entity'

class GenericElementGenericTask extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.GenericElementId = json.genericElementId;
            this.GenericTaskId = json.genericTaskId;
            this.Status = json.status;
            this.GenericElementName = json.generiElementName;
            this.GenericTaskDescription = json.genericTaskDescription;
        }
        else
        {
            this.GenericElementId = "";
            this.GenericTaskId = "";
            this.Status = "";
            this.GenericElementName = "";
            this.GenericTaskDescription = "";
        }
        
    }
}

export default GenericElementGenericTask;