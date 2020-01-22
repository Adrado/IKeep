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
            this.Priority = json.priority;
            this.ChoreTypeId = json.choreTypeId;
            this.FormatLabelId = json.formatId;
            this.CategoryId = json.categoryId;
            this.ChoresIds = json.tasksIds;

            this.ChoreTypeName = json.choreTypeName;
            this.FormatName = json.formatName;
            this.CategoryName = json.categoryName;

            this.GenericChoreFormatLabels = json.genericChoreFormatLabels;
        }
        else
        {
            this.Ref = "";
            this.Description = "";
            this.Duration = "";
            this.Period = Period;
            this.Priority = Priority;
            this.ChoreTypeId = "";
            this.FormatId = "";
            this.CategoryId = "";
            this.ChoresIds = "";

            this.ChoreTypeName = "";
            this.FormatName = "";
            this.CategoryName = "";
            
            this.GenericChoreFormatLabels = [];
        }
    }

}
export default GenericChore;

const Period = Object.freeze({
    Daily: 0,
    Weekly: 1,
    Monthly: 2,
    Bimonthly: 3,
    Quarterly: 4,
    Semester: 5,
    Yearly: 6,
    TwoYearly: 7,
    FourYearly: 8,
    DEFAUL: 9
})

const Priority = Object.freeze({
    Top: 0,
    Average: 1,
    Low: 2,
    DEFAULT: 3
})

