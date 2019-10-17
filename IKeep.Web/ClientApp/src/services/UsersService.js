import CRUDService from './CRUDService'
class UsersService extends CRUDService
{
    constructor()
    {
        super("users");
    }
}

export default UsersService;
