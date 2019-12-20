import Entity from './Entity'

class FormatLabel extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Name = json.name;
            this.Extension = json.extension;
        }
        else
        {
            this.Name = "";
            this.Extension = "";
        }

    }
}

export default FormatLabel;