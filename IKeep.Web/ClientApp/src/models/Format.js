﻿import Entity from './Entity'

class Format extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Name = json.name;
        }
        else
        {
            this.Name = "";
        }

    }
}

export default Format;