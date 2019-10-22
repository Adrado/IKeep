class Area extends Entity
{
    constructor(json)
    {
        super(json)
        if(json)
        {
            this.Ref = json.ref;
            this.Name = json.name;
            this.Description = json.description;
            this.FloorId = json.floorId;
            this.GenericElementsIds = json.genericElementsIds;
            this.Map = json.map;
        }
        else
        {
            this.Ref = "";
            this.Name = "";
            this.Description = "";
            this.FloorId = "00000000-0000-0000-0000-000000000000";
            this.GenericElementsIds = [];
            this.Map = "";
        }
        
    }
}