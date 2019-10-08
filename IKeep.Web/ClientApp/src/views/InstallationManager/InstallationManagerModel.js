import React, {Component} from 'react';
import InstallationViewModel from '../Installation/InstallationViewModel';
import {Grid} from '@material-ui/core' 
import TreeViewModel from '../TreeView/TreeViewModel';

class InstallationManagerModel extends Component
{
    render()
    {
        return(
            <React.Fragment>
                <Grid container>
                    <Grid item xs={4}>
                        <Grid item xs = {12}>
                            <TreeViewModel/>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <InstallationViewModel/>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default InstallationManagerModel;