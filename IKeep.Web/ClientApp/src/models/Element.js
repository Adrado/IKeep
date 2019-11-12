import Entity from './Entity'

class Element extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Ref = json.ref;
            this.Name = json.name;
            this.Status = json.status;
            this.ElementTypeId = json.elementTypeId;
            this.AreaId = json.area.Id;
            this.TasksIds = json.tasksIds;
            this.CorrectivesIds = json.correctivesIds;
            this.ObservationsIds = json.observationsIds;
            this.GenericElementId = json.genericElementId;
        }
        else
        {
            this.Ref = "";
            this.Name = "";
            this.Status = "";
            this.ElementTypeId = "";
            this.AreaId = "";
            this.TasksIds = [];
            this.CorrectivesIds = [];
            this.ObservationsIds = [];
            this.GenericElementId = "00000000-0000-0000-0000-000000000000";
        }
    }
}

export default Element;