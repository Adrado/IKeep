class PartialReportRequest
{
    constructor(json)
    {
        if(json)
        {
            this.InstallationId = json.installationId;
            this.Year = json.year;

        }
        else
        {
            this.InstallationId = "";
            this.Year = "";
        }
    }
}

export default PartialReportRequest;