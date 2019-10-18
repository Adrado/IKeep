import React, {Component} from 'react';
//import InstallationViewModel from '../Installation/InstallationViewModel';
import {Grid} from '@material-ui/core' 
import TreeViewModel from '../TreeView/TreeViewModel';
import InstallationSvc from '../../providers/Providers'
import CreateInstallationForm from '../Installation/CreateInstallationForm'

class InstallationManagerModel extends Component
{
    constructor()
    {
        super()
        /* this.getNodeId = this.getNodeId.bind(this);
        this.onToggle = this.onToggle.bind(this); */
    }

    GetNodeId()
    {
        
    }
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
                        <InstallationSvc.Provider>
                            <CreateInstallationForm/>
                        </InstallationSvc.Provider>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default InstallationManagerModel;