import CRUDService from './CRUDService'
class UsersService extends CRUDService
{
    constructor()
    {
        super("api/users/");
    }
}

export default UsersService;
