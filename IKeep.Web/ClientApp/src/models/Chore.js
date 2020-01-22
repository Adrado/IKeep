import Entity from './Entity'

class Chore extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.ElementId = json.elementId;
            this.UserId = json.userId;
            this.StartDate = json.startDate;
            this.EndDate = json.endDate;
            this.GenericChoreId = json.genericChoreId;
            this.Description = json.description;
            this.Type = json.type;
            this.Category = json.category;
            this.Period = json.period;
            this.Priority = json.priority;
            this.Status = json.status;
            this.Duration = json.duration;
            // Encontrar la manera de convertir formatValues en un array de objetos FormatValue
            this.FormatValues = json.formatValues;
        }
        else
        {
            this.ElementId = "";
            this.UserId = "";
            this.StartDate = "";
            this.EndDate = "";
            this.GenericChoreId = "";
            this.Description = "";
            this.Type = "";
            this.Category = "";
            this.Period = "";
            this.Priority = "";
            this.Status = "";
            this.Duration = "";
            this.FormatValues = [];
        }
    }
}

export default Chore;