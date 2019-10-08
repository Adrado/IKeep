import CRUDService from './CRUDService'
class AreasService extends CRUDService
{
    constructor()
    {
        super("api/areas/");
    }
}

export default AreasService;
