import Entity from './Entity'

class Chore extends Entity
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
            this.GenericChoreId = json.genericChoreId;

            this.StartDate = json.starDate;
            this.EndDate = json.endDate;

            this.FormatTaskId = json.FormatTaskId;
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
            this.GenericChoreId = "";

            this.StartDate = "";
            this.EndDate = "";
        }
    }
}

export default Chore;