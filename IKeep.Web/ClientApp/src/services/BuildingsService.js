import CRUDService from './CRUDService'
class BuildingsService extends CRUDService
{
    constructor()
    {
        super("buildings");
    }

    GetBuildingsOfInstallation(installationId)
    {
        return this.GetByIdAsync("installation/" + installationId);
    }
}

export default BuildingsService;
