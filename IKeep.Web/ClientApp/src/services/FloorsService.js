import CRUDService from './CRUDService'
class FloorsService extends CRUDService
{
    constructor()
    {
        super("api/floors/");
    }
}

export default FloorsService;
