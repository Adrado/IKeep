import Entity from './Entity'

class GenericTask extends Entity
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
            this.FormatId = json.formatId;
            this.CategoryId = json.categoryId;
            this.TasksIds = json.tasksIds;
        }
        else
        {
            this.Ref = "";
            this.Description = "";
            this.Duration = "";
            this.Period = Period;
            this.PriorityId = "";
            this.FormatId = "";
            this.CategoryId = "";
            this.TasksIds = "";
        }
    }

}

export default GenericTask;

const Period = Object.freeze({
    Daily: 0,
    Weekly: 1,
    Monthly: 2,
    Bimonthly: 3,
    Quarterly: 4,
    Semester: 5,
    Yearly: 6,
    TwoYearly: 7,
    FourYearly: 8
})

