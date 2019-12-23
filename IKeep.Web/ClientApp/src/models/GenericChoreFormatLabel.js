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
            this.FormatName = json.formatName;
            this.FormatExtension = json.formatExtension;
        }
        else
        {
            this.FormatLabelId = "";
            this.GenericChoreId = "";
            this.FormatName = "";
            this.FormatExtension = "";
        }
        
    }
}

export default GenericChoreFormatLabel;