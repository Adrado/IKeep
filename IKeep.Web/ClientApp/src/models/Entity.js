class Entity
{
    constructor(json)
    {
        if (json)
        {
            this.Id = json.id
            this.EntityStatus = json.entityStatus;
        }
            
        else
        {
            this.Id = "00000000-0000-0000-0000-000000000000";
            this.EntityStatus = 1;
        }
            
        
    }
}

export default Entity;