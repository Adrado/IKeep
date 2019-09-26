import Entity from './Entity';

class User extends Entity
{
    constructor()
    {
        super();
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
        this.EntryTime = "";
        this.ExitTime = "";
        this.ImageId = "";
        this.Token = "";
        this.RoleId = "";
    }
}

export default User;