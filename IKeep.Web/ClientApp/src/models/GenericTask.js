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
            this.Period = 0;
            this.PriorityId = "";
            this.FormatId = "";
            this.CategoryId = "";
            this.TasksIds = "";
        }
    }

}

export default GenericTask;

const Period =
    [
        Daily,
        Weekly,
        Monthly,
        Bimonthly,
        Quarterly,
        Semester,
        Yearly,
        TwoYearly,
        FourYearly
    ]

