/* import React, {Component} from 'react';
import CreateBuildingForm from './CreateBuildingForm';
/* import BuildingTreeView from './BuildingTreeView'; */
import Building from '../../models/Building';
import BuildingsService from '../../services/BuildingsService';
import BuildingssService from '../../services/BuildingssService';
import FloorsService from '../../services/FloorsService';
import AreasService from '../../services/AreasService';
/* import BuildingTable from './BuildingTable'; */


let BuildingService = new BuildingsService();

class BuildingViewModel extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            Ref : '',
            Name : '',
            CIF : '',
            CP : '',
            Address :'',
            City : '',
            Phone : '',
            Phone2 : '',
            Fax : '',
            Email : ''
        };

        this.Buildings = [];
        this.HandleChange = this.HandleChange.bind(this);
        this.AddNewBuilding = this.AddNewBuilding.bind(this);
        this.EditBuilding = this.EditBuilding.bind(this);
        this.DesactiveBuilding = this.DesactiveBuilding.bind(this);

        this.BuildingsService = BuildingService;
        this.BuildingssService = BuildingssService;
        this.FloorsService = FloorsService;
        this.AreasService = AreasService;
        this.GetAllBuildings();
    }

    HandleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
    }
        
    AddNewBuilding()
    {
        let building = new Building();
        building.Ref = this.state.Ref;
        building.Name = this.state.Name;
        building.CIF = this.state.CIF;
        building.CP = this.state.CP;
        building.Address = this.state.Address;
        building.City = this.state.City;
        building.Phone = this.state.Phone;
        building.Phone2 = this.state.Phone2;
        building.Fax = this.state.Fax;
        building.Email = this.state.Email;

        this.BuildingsService.AddAsync(building)
            .then((response) => { this.OnAddedBuilding(response); });

        this.CleanForm();
    }

    OnAddedBuilding(response)
    {
        let building = new Building (response.data);
        this.Buildings.push(building);
        console.log(response);
        alert("K");
    }

    CleanForm()
    {
        this.setState({
            Name: '',
            Ref : '',
            Name : '',
            CIF : '',
            CP : '',
            Address :'',
            City : '',
            Phone : '',
            Phone2 : '',
            Fax : '',
            Email : ''
          });
    }

    GetAllBuildings()
    {
        this.BuildingsService.GetAllAsync()
        .then((response) =>
            {
                console.log(response);
                this.OnGetData(response);
            });

        this.BuildingssService.GetAllAsync()
        .then((response) =>
            {
                console.log(response);
                this.OnGetData(response);
            });

        this.FloorsService.GetAllAsync()
        .then((response) =>
            {
                console.log(response);
                this.OnGetData(response);
            });

        this.AreasService.GetAllAsync()
        .then((response) =>
            {
                console.log(response);
                this.OnGetData(response);
            });
    }

    OnGetData(response)
    {
        this.Buildings.length = 0;
        for (let i in response.data)
        {
            let building = new Building(response.data[i]);
            
            if(building.EntityStatus !== 0)  
                this.Buildings.push(building);
        }
    }

    EditBuilding(newData, oldData)
    {
        this.BuildingsService.UpdateAsync(newData)
        .then((response) =>
        {
            this.OnUpdateBuilding(response);
        });
    }

    OnUpdateBuilding(response)
    {
        let building = new Building(response.data)
        let index = this.Buildings.findIndex(x => x.Id === building.Id);
        this.Buildings[index] = building;
    }
    
    DesactiveBuilding(entity)
    {
        entity.EntityStatus = 0;
        this.BuildingsService.UpdateAsync(entity)
        .then((response) =>
        {
            this.OnDesactiveBuilding(entity);
            console.log(response);
        });
    }

    OnDesactiveBuilding(entity)
    {
        let index = this.Buildings.findIndex(x => x.Id === entity.Id);
        this.Buildings.splice(index, 1);
    }

    render()
    {
        return(
                <CreateBuildingForm
                    onClick = {this.AddNewBuilding}
                    onChange = {this.HandleChange}
                    State = {this.state}
                />
        )
    }
}

export default BuildingViewModel; */