import Entity from './Entity'

class Element extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Name = json.name;
            this.ElementTypeId = json.elementTypeId;
            this.ElementTypeName = json.elementTypeName;

            this.AreaId = json.area.Id;
            this.TasksIds = json.tasksIds;
            this.CorrectivesIds = json.correctivesIds;
            this.ObservationsIds = json.observationsIds;
            this.GenericElementId = json.genericElementId;

            this.Status = json.status;
        }
        else
        {
            this.Name = "";
            this.ElementTypeId = "";
            this.ElementTypeName = "";
            
            this.AreaId = "";
            this.TasksIds = [];
            this.CorrectivesIds = [];
            this.ObservationsIds = [];
            this.GenericElementId = "00000000-0000-0000-0000-000000000000";

            this.Status = "";
        }
    }
}

export default Element;