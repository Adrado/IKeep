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
}

export default ElementsService;
