import CRUDService from './CRUDService'
class RolesService extends CRUDService
{
    constructor()
    {
        super("api/roles/");
    }
}

export default RolesService;
