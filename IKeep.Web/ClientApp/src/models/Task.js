import Entity from './Entity'

class Task extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Ref = json.ref;
            this.Description = json.description;
            this.Duration = json.duration;
            this.Period = json.period;
            this.PriorityId = json.priorityId;
            this.FormatId = json.formatiId;
            this.CategoryId = json.categoryId;

            this.ElementId = json.elementId;
            this.SupplierId = json.supplierId;
            this.RoleId = json.roleId;
            this.Status = json.status;
            this.GenericTaskId = json.genericTaskId;

            this.StartDate = json.starDate;
            this.EndDate = json.endDate;
        }
        else
        {
            this.Ref = "";
            this.Description = "";
            this.Duration = "";
            this.Period = "";
            this.PriorityId = "";
            this.FormatId = "";
            this.CategoryId = "";

            this.ElementId = "";
            this.SupplierId = "";
            this.RoleId = "";
            this.Status = "";
            this.GenericTaskId = "";

            this.StartDate = "";
            this.EndDate = "";
        }
    }
}

export default Task;