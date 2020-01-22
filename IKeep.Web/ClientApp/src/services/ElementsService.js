import CRUDService from './CRUDService'
class ElementsService extends CRUDService
{
    constructor()
    {
        super("elements");
    }

    GetNumByElementIdAsync(gElementId)
    {
        return this.GetByIdAsync("genericElement/" + gElementId);
    }

    GetAllElementsOfInstallation(installationId)
    {
        return this.GetByIdAsync("installation/" + installationId);
    }
}

export default ElementsService;
