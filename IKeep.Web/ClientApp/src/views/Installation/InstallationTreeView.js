import React from 'react';
import TreeView from '@material-ui/lab/TreeView';

let InstallationTreeView = props =>
{
    const classes = useStyles();
    let {onClick, onChange, State} = props;
    let gato = [[1[3]],[2]]
    return(
        <TreeView
            children = {gato}
        >
        </TreeView>
    );
}

export default InstallationViewModel;