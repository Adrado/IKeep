import Entity from './Entity'

class Installation extends Entity
{
    constructor()
    {
        super();
        this.Ref = "";
        this.Name = "";
        this.CIF = "";
        this.CP = 0;
        this.Address = "";
        this.City = "";
        this.Phone = 0;
        this.Phone2 = 0;
        this.Fax = "";
        this.Email = "";
        this.BuildingsIds = [];
        this.ReportsIds = [];
        this.InspectionsIds = [];
    }
}

export default Installation;