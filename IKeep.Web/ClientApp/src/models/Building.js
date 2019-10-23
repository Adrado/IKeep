import Entity from './Entity'

class Building extends Entity
{
    constructor(json)
    {
        super(json)
        if(json)
        {
            this.Ref = json.ref;
            this.Name = json.name;
            this.Description = json.description;
            this.InstallationId = json.installationId;
            this.FloorsIds = json.floorsIds;
        }
        else
        {
            this.Ref = "";
            this.Name = "";
            this.Description = "";
            this.InstallationId = "";
            this.FloorsIds = [];
        }
    }
}

export default Building;