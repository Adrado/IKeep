import Entity from './Entity'

class GenericChore extends Entity
{
    get FormatDescription()
    {
        return this.Title + ", " + this.Author;
    }
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
            this.FormatLabelId = json.formatId;
            this.CategoryId = json.categoryId;
            this.ChoresIds = json.tasksIds;

            this.PriorityName = json.priorityName;
            this.FormatName = json.formatName;
            this.CategoryName = json.categoryName;

            this.GenericChoreFormatLabels = json.genericChoreFormatLabels;
        }
        else
        {
            this.Ref = "";
            this.Description = "";
            this.Duration = "";
            this.Period = Periodicity;
            this.PriorityId = "";
            this.FormatId = "";
            this.CategoryId = "";
            this.ChoresIds = "";

            this.PriorityName = "";
            this.FormatName = "";
            this.CategoryName = "";
            
            this.GenericChoreFormatLabels = [];
        }
    }

}
export default GenericChore;

const Periodicity = Object.freeze({
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

