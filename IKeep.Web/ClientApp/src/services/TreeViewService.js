import CRUDService from './CRUDService'
class TreeViewService extends CRUDService
{
    constructor()
    {
        super("api/treeview/");
    }
}

export default TreeViewService;
