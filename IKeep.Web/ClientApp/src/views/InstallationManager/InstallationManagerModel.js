import React from 'react';
import {Grid} from '@material-ui/core' 
import {Functions, Services, CRUD} from '../../providers/Providers';

import TreeView from '../TreeView/TreeView';
import InstallationForm from '../Installation/InstallationForm';
import BuildingForm from '../Building/BuildingForm';
import FloorForm from '../Floor/FloorForm';
import AreaForm from '../Area/AreaForm';
import useInstallationManager from './useInstallationManager';

const InstallationManagerModel =() =>
{
    const {node, onSelectNode} = useInstallationManager()
    
    return(
        <React.Fragment>
            <Grid container>
                <Grid item xs={4}>
                    <Grid item xs = {12}>
                        <Functions.Provider value = {onSelectNode}>
                            <Services.Provider value={CRUD.TreeView}>
                                <TreeView/>
                            </Services.Provider>
                        </Functions.Provider>
                    </Grid>
                </Grid>

                { node !== null &&
                <Grid item xs={8}>
                    { node.Type === "Installation" &&
                    <Services.Provider value={CRUD.Installation}>
                        <InstallationForm model = {node}/>
                    </Services.Provider>}

                    {node.Type === "Building" &&
                    <Services.Provider value={CRUD.Building}>
                        <BuildingForm model = {node}/>
                    </Services.Provider>}

                    {node.Type === "Floor" &&
                    <Services.Provider value={CRUD.Floor}>
                        <FloorForm model = {node}/>
                    </Services.Provider>}

                    {node.Type === "Area" &&
                    <Services.Provider value={CRUD.Area}>
                        <AreaForm model = {node}/>
                    </Services.Provider>}
                </Grid>}
            </Grid>
        </React.Fragment>
    )
}

export default InstallationManagerModel;