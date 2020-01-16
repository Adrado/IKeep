import CRUDService from './CRUDService'
class ChoresService extends CRUDService
{
    constructor()
    {
        super("chores");
    }
    GetCurretReport()
    {
        return this.GetByIdAsync("currentReport/");
    }
}

export default ChoresService;
