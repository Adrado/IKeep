import Entity from './Entity'

class Floor extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Ref = json.ref; 
            this.Name = json.name;
            this.BuildingId = json.buildingId;
            this.AreasIds = json.areasIds;
            this.MapsIds = json.mapsIds;
        }
        else
        {
            this.Ref = ""; 
            this.Name = "";
            this.BuildingId = "";
            this.AreasIds = [];
            this.MapsIds = [];
        }
    }
}

export default Floor;