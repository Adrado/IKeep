import Entity from './Entity'

class ElementGenericTask extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.ElementId = json.elementId;
            this.GenericTaskId = json.genericTaskId;
            this.Status = json.status;
            this.ElementName = json.generiElementName;
            this.GenericTaskDescription = json.genericTaskDescription;
        }
        else
        {
            this.ElementId = "";
            this.GenericTaskId = "";
            this.Status = 1;
            this.ElementName = "";
            this.GenericTaskDescription = "";
        }
        
    }
}

export default ElementGenericTask;