import CRUDService from './CRUDService'
class TasksService extends CRUDService
{
    constructor()
    {
        super("tasks");
    }
}

export default TasksService;
