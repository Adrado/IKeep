import GenericService from './GenericService'
class PreventiveMaintenanceService extends GenericService
{
    constructor()
    {
        super("preventiveMaintenance");
    }
    GetCurrentChores(request)
    {
        return this.Post(request);
    }
}

export default PreventiveMaintenanceService;
