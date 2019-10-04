import React from 'react';
import TreeViewService from '../../services/TreeViewService'
import TreeView from './TreeView'
class TreeViewModel extends Component
{
    constructor(props)
    {
        super(props);

        this.TreeViewService = new TreeViewService();
    }

    render()
    {
        return(
            <TreeView/>
        );
    }
}

export default TreeViewModel;