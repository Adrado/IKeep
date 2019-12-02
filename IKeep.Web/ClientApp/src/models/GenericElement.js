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
            /* this.GenericElementGenericTasksIds = json.genericElementGenericTasksIds;
            this.GenericTasksIds = json.genericTasksIds; */
            this.GenericElementGenericTasks = json.genericElementGenericTasks;
        }
        else
        {
            this.Name = "";
            this.ElementTypeId = "";
            this.ElementTypeName = "";
            this.ElementsIds = [];
            /* this.GenericElementGenericTasksIds = [];
            this.GenericTasksIds = []; */
            this.GenericElementGenericTasks = [];
        }
    }
}

export default GenericElement;