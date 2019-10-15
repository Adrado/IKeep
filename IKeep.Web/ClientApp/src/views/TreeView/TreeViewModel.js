import React, {Component} from 'react';
import TreeViewService from '../../services/TreeViewService'
import TreeView from './TreeView'
import InstallationsService from '../../services/InstallationsService'
import BuildingsService from '../../services/BuildingsService'
import FloorsService from '../../services/FloorsService'
import AreasService from '../../services/AreasService'
//import InstallationManagerModel from '../InstallationManager/InstallationManagerModel';
import Installation from '../../models/Installation'
import TreeExample from './TreeView'

class TreeViewModel extends Component
{
    constructor(props)
    {
        super(props);
        this.TreeViewService = new TreeViewService();

        this.InstallationsService = new InstallationsService();
        this.BuildingsService = new BuildingsService();
        this.FloorsService = new FloorsService();
        this.AreasService = new AreasService();

        this.Data = {};
        this.GetTreeView();
        this.TreeViewData = [];
        this.InstallationsData
        this.state =
        {
            vocal: ''
        }
        

        
    }

    GetTreeView()
    {
        this.TreeViewService.GetAllAsync()
        .then((response) =>
            {
                this.OnGetData(response);
            });
    } 

    OnGetData(response)
    {
        this.Data = response.data.rootNode;
        console.log(response);
        console.log("Ahora?")
        console.log(this.Data);
        this.setState({vocal : 'b'})
        //this.CleanForm();
    } 

    /* GetAllInstallations()
    {
        this.InstallationsService.GetAllAsync()
        .then((response) =>
            {
                console.log(response);
                this.OnGetData(response);
            });
    } */

    /* OnGetData(response)
    {
        this.Installations.length = 0;
        for (let i in response.data)
        {
            let installation = new Installation(response.data[i]);
            
            if(installation.EntityStatus !== 0)  
                this.Installations.push(installation);
        }
    } */

    render()
    {
        console.log("x");
        console.log(this.Data);
        return(
            <TreeExample
            Data = {this.Data}
            />
        );
    }
}

export default TreeViewModel;