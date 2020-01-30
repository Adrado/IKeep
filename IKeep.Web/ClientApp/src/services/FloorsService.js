import CRUDService from './CRUDService'
class FloorsService extends CRUDService
{
    constructor()
    {
        super("floors");
    }
    GetFloorsOfBuilding(buildingId)
    {
        return this.GetByIdAsync("building/" + buildingId);
    }
}

export default FloorsService;
