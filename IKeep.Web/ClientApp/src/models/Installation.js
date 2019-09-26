class Installation extends Entity
{
    constructor()
    {
        this.Ref = "";
        this.Name = "";
        this.CIF = "";
        this.CP = "";
        this.Address = "";
        this.City = "";
        this.Phone = 0;
        this.Phone2 = 0;
        this.Fax = 0;
        this.Email = "";
        this.BuildingsIds = [];
        this.ReportsIds = [];
        this.InspectionsIds = [];
    }
}