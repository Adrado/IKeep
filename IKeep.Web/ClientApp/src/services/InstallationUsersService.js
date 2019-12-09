import CRUDService from './CRUDService'
class InstallationUsersService extends CRUDService
{
    constructor()
    {
        super("installationUsers");
    }

    GetByInstallationIdAsync(installationId)
    {
        return this.GetByIdAsync("installation/" + installationId);
    }

    GetByUserIdAsync(userId)
    {
        return this.GetByIdAsync("user/" + userId);
    }
}

export default InstallationUsersService;
