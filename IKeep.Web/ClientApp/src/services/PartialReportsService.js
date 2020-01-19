import GenericService from './GenericService'
class PartialReportsService extends GenericService
{
    constructor()
    {
        super("partialReport");
    }
    GetPartialReport(request)
    {
        return this.Post(request);
    }
}

export default PartialReportsService;
