import CRUDService from './CRUDService'
class TreeViewService extends CRUDService
{
    constructor()
    {
        super("api/TreeView/");
    }
}

export default TreeViewService;
