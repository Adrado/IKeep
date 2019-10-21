import React, {Component} from 'react';
//import InstallationViewModel from '../Installation/InstallationViewModel';
import {Grid} from '@material-ui/core' 
import TreeViewModel from '../TreeView/TreeViewModel';
import {Services, CRUD} from '../../providers/Providers';
import FloorForm from '../Floor/FloorForm'

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
                        <Services.Provider value={CRUD.Installation}>
                            <FloorForm id="2"/>
                        </Services.Provider>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default InstallationManagerModel;