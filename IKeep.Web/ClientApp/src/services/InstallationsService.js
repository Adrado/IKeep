import CRUDService from './CRUDService';
import { action, decorate } from "mobx";

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
