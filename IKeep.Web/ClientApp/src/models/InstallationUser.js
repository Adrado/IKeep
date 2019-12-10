import Entity from './Entity'

class InstallationUser extends Entity
{
    get UserFullName()
    {
        let fullName = this.UserName + " " + this.UserFirstSurname; 
        return fullName;
    }
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.UserId = json.userId;
            this.InstallationId = json.installationId;
            this.UserName = json.userName;
            this.InstallationName = json.installationName;
            this.UserFirstSurname = json.userFirstSurname;

            this.RoleId = json.roleId;
            this.RoleName = json.role;
            /* this.CategoryId = json.categoryId;
            this.CategoryName = json.category; */
        }
        else
        {
            this.UserId = "00000000-0000-0000-0000-000000000000";
            this.InstallationId = "00000000-0000-0000-0000-000000000000";
            this.UserName = "";
            this.InstallationName = "";
            this.UserFirstSurname = "";

            this.RoleId = "";
            this.RoleName = "";
            /* this.CategoryId = "00000000-0000-0000-0000-000000000000";
            this.CategoryName = ""; */
        }
    }
}

export default InstallationUser;