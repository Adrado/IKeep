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
        this.setState({vocal : 'b'});
        console.log(this.Data);
        //this.CleanForm();
       this.ModifiedData(response.data.rootNode)
    } 

    ModifiedData(data)
    {
        let installations = data.children;
        for(let i in installations)
        {
            let installation = installations[i];
            let Buildings = installation.children
            for (let k in Buildings)
            {
                let Building = Buildings[k];
                let Floors = Building.children;
                for(let j in Floors)
                {
                    let Floor = Floors[j];
                    let Areas = Floor.children
                    let newArea =
                    {
                        name: "Añadir Nuevo Espacio",
                        id: Floor,
                        type: "Area"
                    }
                    Areas.push(newArea)
                }
                let newFloor =
                {
                    name: "Añadir Nueva Planta",
                    id: Building.id,
                    type: "Floor"
                }
                Floors.push(newFloor)
            } 
            let newBuilding = 
            {
                name: "Añadir Nuevo Edificio",
                id: installation.id,
                type: "Building"
            }
            Buildings.push(newBuilding);
            console.log();
        }

        var newInstallation =
        {
            name: "Añadir Nueva Instalación",
            type: "Installation"
        }
        installations.push(newInstallation);
        console.log(installations.children);
    }

    AddNew()
    {
        alert("Se ha llamado a un callback");
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