import Entity from './Entity'

class Installation extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Ref = json.ref;
            this.Name = json.name;
            this.CIF = json.cif;
            this.CP = json.cp;
            this.Address = json.address;
            this.City = json.city;
            this.Phone = json.phone;
            this.Phone2 = json.phone2;
            this.Fax = json.fax;
            this.Email = json.email;
            this.BuildingsIds = json.buildingsIds;
            this.ReportsIds = json.reportsIds;
            this.InspectionsIds = json.inspectionsIds;
            this.InstallationUsers = json.installationUsers;
        }
        else
        {
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
            this.InstallationUsers = [];
        }
    }
}

export default Installation;