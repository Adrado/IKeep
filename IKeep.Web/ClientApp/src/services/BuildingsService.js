import CRUDService from './CRUDService'
class BuildingsService extends CRUDService
{
    constructor()
    {
        super("api/buildings/");
    }
}

export default BuildingsService;
