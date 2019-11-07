class Entity
{
    constructor(json)
    {
        if (json)
        {
            this.Id = json.id
            this.EntityStatus = json.entityStatus;
            this.EntityType = json.entityType;
        }
            
        else
        {
            this.Id = "00000000-0000-0000-0000-000000000000";
            this.EntityStatus = 1;
            this.EntityType = "";
        }
            
        
    }
}

export default Entity;