class MaintenanceRequest
{
    constructor(installationId)
    {
        this.InstallationId = installationId;
        this.Date = new Date();
    }
}

export default MaintenanceRequest;