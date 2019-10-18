import CRUDService from './CRUDService';

class InstallationsService extends CRUDService
{
    constructor()
    {
        super("installations");
    }
}

export default InstallationsService;

/* decorate(InstallationsService, {
    GetAllAsync: action,
    AddAsync: action,
    UpdateAsync: action,
    DeleteAsync: action
}) */
