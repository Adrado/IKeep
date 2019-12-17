class NewChoresRequest
{
    constructor(json)
    {
        if(json)
        {
            this.InstallationId = json.installationId;
            
            this.BuildingId = json.buildinId;
            this.FloorId = json.floorId;
            this.AreaId = json.areaId;

            this.Year = json.year;
            this.Month = json.month;
            this.Day = json.day;
        }
        else
        {
            this.InstallationId = "";
            this.BuildingId = "";
            this.FloorId = "";
            this.AreaId = "";
            this.Year = "";
            this.Month = "";
            this.Day = "";
        }
    }
}

export default NewChoresRequest;