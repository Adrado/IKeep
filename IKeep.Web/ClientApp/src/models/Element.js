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
            this.TypeName = json.typeName;

            this.AreaId = json.areaId;
            this.ElementGenericTasksIds = json.elementGenericTasksIds;
            this.TasksIds = json.tasksIds;
            this.CorrectivesIds = json.correctivesIds;
            this.ElementObservationsIds = json.elementObservationsIds;
            this.GenericElementId = json.genericElementId;
            this.ElementImagesIds = json.elementImagesIds;

            this.Status = json.status;
        }
        else
        {
            this.Ref = "";
            this.Brand = "";
            this.Model = "";
            this.Description = "";
            this.SafetyAndHealth = "";
            this.AreaId = "";

            this.Name = "";
            this.TypeName = "";
            
            this.ElementGenericTasksIds = [];
            this.TasksIds = [];
            this.CorrectivesIds = [];
            this.ElementObservationsIds = [];
            this.ElementImagesIds = [];
            this.GenericElementId = "00000000-0000-0000-0000-000000000000";

            this.Status = 1;
        }
    }
}

export default Element;