import React, {Component} from 'react';
import CreateInstallationForm from './CreateInstallationForm';
import InstallationTreeView from './InstallationTreeView';
import Installation from '../../models/Installation';
import InstallationsService from '../../services/InstallationsService';
import { Grid } from '@material-ui/core';
/* import InstallationTable from './InstallationTable'; */


let InstallationService = new InstallationsService();

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
            Addres :'',
            City : '',
            Phone : '',
            Phone2 : '',
            Fax : '',
            Email : ''
        };

        this.Installations = [];
        this.HandleChange = this.HandleChange.bind(this);
        this.AddNewInstallation = this.AddNewInstallation.bind(this);
        this.EditInstallation = this.EditInstallation.bind(this);
        this.DesactiveInstallation = this.DesactiveInstallation.bind(this);

        this.InstallationsService = InstallationService;
        this.GetAllInstallations();
        this.render();
        this.GetAllInstallations();
    }

    HandleChange(e)
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
        installation.Address = this.state.Addres;
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
        console.log(response);
    }

    CleanForm()
    {
        this.setState({
            Name: '',
            Ref : '',
            Name : '',
            CIF : '',
            CP : '',
            Addres :'',
            City : '',
            Phone : '',
            Phone2 : '',
            Fax : '',
            Email : ''
          });
    }

    GetAllInstallations()
    {
        this.InstallationsService.GetAllAsync()
        .then((response) =>
            {
                console.log(response);
                this.OnGetData(response);
            });
    }

    OnGetData(response)
    {
        this.Installations.length = 0;
        for (let i in response.data)
        {
            let installation = new Installation(response.data[i]);
            
            if(installation.EntityStatus !== 0)  
                this.Installations.push(installation);
        }
    }

    EditInstallation(newData, oldData)
    {
        this.InstallationsService.UpdateAsync(newData)
        .then((response) =>
        {
            this.OnUpdateInstallation(response);
        });
    }

    OnUpdateInstallation(response)
    {
        let installation = new Installation(response.data)
        let index = this.Installations.findIndex(x => x.Id === installation.Id);
        this.Installations[index] = installation;
    }
    
    DesactiveInstallation(entity)
    {
        entity.EntityStatus = 0;
        this.InstallationsService.UpdateAsync(entity)
        .then((response) =>
        {
            this.OnDesactiveInstallation(entity);
            console.log(response);
        });
    }

    OnDesactiveInstallation(entity)
    {
        let index = this.Installations.findIndex(x => x.Id === entity.Id);
        this.Installations.splice(index, 1);
    }

    render()
    {
        return(
            <React.Fragment>
                <Grid container>
                    <Grid item xs={4}>
                        <Grid item xs = {12}>
                            <InstallationTreeView/>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
                        <CreateInstallationForm
                            onClick = {this.AddNewInstallation}
                            onChange = {this.HandleChange}
                            State = {this.state}
                        />
                    </Grid>
                </Grid>
                {/* <InstallationTable
                    Installations = {this.Installations}
                    OnEdit = {this.EditInstallation}
                    OnDelete = {this.DesactiveInstallation}
                /> */}
            </React.Fragment>
        )
    }
}

export default InstallationViewModel;