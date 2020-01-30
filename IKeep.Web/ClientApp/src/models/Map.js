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
            this.FloorId = json.floorId;
            this.ImageBase64 = json.imageBase64;

        }
        else
        {
            this.Name = "";
            this.Description = "";
            this.FloorId = "";
            this.ImageBase64 = "";
        } 
    }
}

export default Map;