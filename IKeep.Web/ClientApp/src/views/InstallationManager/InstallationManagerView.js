import React from 'react';
import {Grid} from '@material-ui/core' 
import {Functions, Services, CRUD} from '../../providers/Providers';

import TreeView from '../TreeView/TreeView';
import InstallationForm from '../Installation/InstallationForm';
import BuildingForm from '../Building/BuildingForm';
import FloorForm from '../Floor/FloorForm';
import AreaView from '../Area/AreaView';
import useInstallationManager from './useInstallationManager';
import useInstallationFormManager from './useInstallationFormManager';

const InstallationManagerView =() =>
{
    const {node, onSelectNode} = useInstallationManager();
    const {modify, onModified} = useInstallationFormManager();
    
    /* useEffect(() =>
    {
        
    }, [modify]) */

    return(
        <React.Fragment>
            <Grid container>
                <Grid item xs={4}>
                    <Grid item xs = {12}>
                        <Functions.Provider value = {onSelectNode}>
                            <Services.Provider value={CRUD.TreeView}>
                                <TreeView 
                                    Update = {modify}
                                    ParentId = {node.ParentId}
                                    />
                            </Services.Provider>
                        </Functions.Provider>
                    </Grid>
                </Grid>

                { node !== null &&
               <Functions.Provider value= {onModified}>
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
                            <AreaView treeNode = {node}/>
                        </Services.Provider>}
                    </Grid>
              </Functions.Provider>
                }
            </Grid>
        </React.Fragment>
    )
}

export default InstallationManagerView;