import Entity from './Entity'

class Element extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Ref = json.ref;
            this.Brand = json.brand;
            this.Model = json.model;
            this.Description = json.description;
            this.SafetyAndHealth = json.safetyAndHealth;

            this.Name = json.name;
            this.ElementTypeName = json.elementTypeName;

            this.AreaId = json.area.Id;
            this.ElementGenericTasksIds = json.elementGenericTasksIds;
            this.TasksIds = json.tasksIds;
            this.CorrectivesIds = json.correctivesIds;
            this.ObservationsIds = json.observationsIds;
            this.GenericElementId = json.genericElementId;

            this.Status = json.status;
        }
        else
        {
            this.Ref = "";
            this.Brand = "";
            this.Model = "";
            this.Description = "";
            this.SafetyAndHealth = "";

            this.Name = "";
            this.ElementTypeName = "";
            
            this.AreaId = "";
            this.ElementGenericTasksIds = [];
            this.TasksIds = [];
            this.CorrectivesIds = [];
            this.ObservationsIds = [];
            this.GenericElementId = "00000000-0000-0000-0000-000000000000";

            this.Status = "";
        }
    }
}

export default Element;