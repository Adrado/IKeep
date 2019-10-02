import CRUDService from './CRUDService'
class InstallationsService extends CRUDService
{
    constructor()
    {
        super("api/installations/");
    }
}

export default InstallationsService;
