import React, {Component} from 'react';
import CreateInstallationForm from './CreateInstallationForm';
import Installation from '../../models/Installation';

//Temporalmente hasta resolver la inyección de dependencias
import InstallationsService from '../../services/InstallationsService';

//Terminar el TreeViewComponent
import BuildingsService from '../../services/BuildingsService';
import FloorsService from '../../services/FloorsService';
import AreasService from '../../services/AreasService';


//Temporalmente hasta resolver la inyección de dependencias
let InstallationService = new InstallationsService();
let BuildingService = new BuildingsService();
let FloorService = new FloorsService();
let AreaService = new AreasService();

class InstallationViewModel extends Component
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

        this.Installations = [];
        this.SelectedInstallation = null;
        this.HandleInputChange = this.HandleInputChange.bind(this);
        //Funciones
        this.AddNewInstallation = this.AddNewInstallation.bind(this);
        this.SaveInstallationChanges = this.SaveInstallationChanges.bind(this);
        this.DesactiveInstallation = this.DesactiveInstallation.bind(this);
        //Servicios
        this.InstallationsService = InstallationService;
        this.BuildingsService = BuildingService;
        this.FloorsService = FloorService;
        this.AreasService = AreaService;

        this.GetAllInstallations();
    }

    HandleInputChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
    }
        
    AddNewInstallation()
    {
        let installation = new Installation();
        installation.Ref = this.state.Ref;
        installation.Name = this.state.Name;
        installation.CIF = this.state.CIF;
        installation.CP = this.state.CP;
        installation.Address = this.state.Address;
        installation.City = this.state.City;
        installation.Phone = this.state.Phone;
        installation.Phone2 = this.state.Phone2;
        installation.Fax = this.state.Fax;
        installation.Email = this.state.Email;

        this.InstallationsService.AddAsync(installation)
            .then((response) => { this.OnAddedInstallation(response); });

        this.CleanForm();
    }

    OnAddedInstallation(response)
    {
        let installation = new Installation (response.data);
        this.Installations.push(installation);
    }

    CleanForm()
    {
        this.setState({
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

    GetInstallation(id)
    {
        this.InstallationsService.GetByIdAsync(id)
        .then((response) =>
        {
            this.OnGetInstallation(response);
        })
    }

    OnGetInstallation(response)
    {
        let installation = new Installation(response.data)
        this.SelectedInstallation = installation;
        this.setState({
            Name: installation.Name,
            Ref :installation.Ref,
            CIF : installation.CIF,
            CP : installation.CP,
            Address : installation.Address,
            City : installation.City,
            Phone : installation.Phone,
            Phone2 : installation.Phone2,
            Fax : installation.Fax,
            Email : installation.Email
          });
    }

    SaveInstallationChanges()
    {
        this.SelectedInstallation.Name = this.state.Name;
        this.SelectedInstallation.Ref = this.state.Ref;
        this.SelectedInstallation.CIF = this.state.CIF;
        this.SelectedInstallation.CP = this.state.CP;
        this.SelectedInstallation.Address = this.state.Address;
        this.SelectedInstallation.City = this.state.City;
        this.SelectedInstallation.Phone = this.state.Phone;
        this.SelectedInstallation.Phone2 = this.sate.Phone2;
        this.SelectedInstallation.Fax = this.state.Fax;
        this.SelectedInstallation.Email = this.state.Email;

        this.InstallationsService.UpdateAsync(this.SelectedInstallation)
        .then((response) =>
        {
            this.OnUpdateInstallation(response);
        });
    }

    OnUpdateInstallation(response)
    {
        //Mandar info a installation manager
    }
    
    DesactiveInstallation()
    {
        this.InstallationsService.DeleteAsync(this.SelectedInstallation.Id)
        .then((response) =>
        {
            this.OnDesactiveInstallation(response);
        });
    }

    OnDesactiveInstallation(response)
    {
       // Mandar info a installation manager
    }

    render()
    {
        return(
                <CreateInstallationForm
                    onClickAdd = {this.AddNew}
                    onClickSave = {this.SaveChanges}
                    onClickDelete = {this.Delete}
                    onChange = {this.HandleInputChange}
                    State = {this.state}
                />
        )
    }
}

export default InstallationViewModel;