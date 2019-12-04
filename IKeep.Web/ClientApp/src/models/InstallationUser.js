import Entity from './Entity'

class InstallationUser extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.UserId = json.userId;
            this.InstallationId = json.installationId;
            this.UserName = json.userName;
            this.InstallationName = json.installationName;
        }
        else
        {
            this.UserId = "00000000-0000-0000-0000-000000000000";
            this.InstallationId = "00000000-0000-0000-0000-000000000000";
            this.UserName = "";
            this.InstallationName = "";
        }
        
    }
}

export default InstallationUser;