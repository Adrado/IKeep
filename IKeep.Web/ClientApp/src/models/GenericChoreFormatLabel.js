import Entity from './Entity'

class GenericChoreFormatLabel extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.FormatLabelId = json.formatLabelId;
            this.GenericChoreId = json. genericChoreId;
        }
        else
        {
            this.FormatLabelId = "";
            this.GenericChoreId = "";
        }
        
    }
}

export default GenericChoreFormatLabel;