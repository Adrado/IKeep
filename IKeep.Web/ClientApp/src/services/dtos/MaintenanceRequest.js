class MaintenanceRequest
{
    constructor(installationId)
    {
        this.InstallationId = installationId;
        this.Date = Date.now();
    }
}

export default MaintenanceRequest;