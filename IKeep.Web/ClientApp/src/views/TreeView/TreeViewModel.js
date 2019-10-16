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
        this.onToggle = this.onToggle.bind(this);
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
        this.setState({vocal : 'b'})
        //this.CleanForm();
    } 

    onToggle(node, toggled){
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) { 
            node.toggled = toggled; 
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }

    render()
    {
        return(
            <TreeExample
            Data = {this.Data}
            onToggle = {this.onToggle}
            />
        );
    }
}

export default TreeViewModel;