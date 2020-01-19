class PartialReportResponse
{
    constructor(json)
    {
        if(json)
        {
            this.CurrentRequest = json.currentRequest;
            this.BeforeYear = json.beforeYear;

        }
        else
        {
            this.CurrentRequest = "";
            this.BeforeYear = "";
        }
    }
}

export default PartialReportResponse;