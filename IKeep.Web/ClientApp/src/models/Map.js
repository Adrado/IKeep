import Entity from './Entity';

class Map extends Entity
{
    constructor()
    {
        this.Name = "";
        this.Description = "";
        this.ImageId = "";
        this.FloorId = "";
        this.AreaRef = "";
    }
}

export default Map;