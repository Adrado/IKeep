import Entity from './Entity';

class Map extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Name = json.name;
            this.Description = json.description;
            this.ImageId = json.imageId;
            this.FloorId = json.floorId;
            this.AreaRef = json.areaRef;
        }
        else
        {
            this.Name = "";
            this.Description = "";
            this.ImageId = "";
            this.FloorId = "";
            this.AreaRef = "";
        } 
    }
}

export default Map;