import Entity from './Entity';

class User extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.LoginName = json.loginName;
            this.Password = json.password;
            this.Name = json.name;
            this.FirstSurname = json.firstSurname;
            this.SecondSurname = json.secondSurname;
            this.DNI = json.dni;
            this.Phone = json.phone;
            this.Phone2 = json.phone2;
            this.Email = json.email;
            this.Birthplace = json.birthplace;
            this.Birthdate = new Date(json.birthdate);
            this.City = json.city;
            this.Address = json.address;
            //this.EntryTime = json.entryTime;
            //this.ExitTime = json.exitTime;
            this.ImageId = json.imageId;
            this.Token = json.token;

            this.RoleId = json.roleId;
        }
        else
        {
            this.LoginName = "";
            this.Password = "";
            this.Name = "";
            this.FirstSurname = "";
            this.SecondSurname = "";
            this.DNI = "";
            this.Phone = 0;
            this.Phone2 = 0;
            this.Email = "";
            this.Birthplace = "";
            this.Birthdate = "";
            this.City = "";
            this.Address = "";
            //this.EntryTime = new Date();
            //this.ExitTime = new Date();
            this.ImageId = "";
            this.Token = "";

            this.RoleId = "";
        }
    }
}

export default User;