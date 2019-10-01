import React, {Component} from 'react';
import CreateInstallationForm from './CreateInstallationForm';
import Installation from '../../models/Installation';
import InstallationsService from '../../services/InstallationsService';
import InstallationTable from './InstallationTable';


let InstallationService = new InstallationsService();

class InstallationViewModel extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            Name : ''
        };

        this.Installations = [];
        this.handleChange = this.handleChange.bind(this);
        this.AddNewInstallation = this.AddNewInstallation.bind(this);
        this.EditInstallation = this.EditInstallation.bind(this);
        this.DesactiveInstallation = this.DesactiveInstallation.bind(this);

        this.InstallationsService = InstallationService;
        this.GetAllInstallations();
        this.render();
        this.GetAllInstallations();
    }

    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
    }
        
    AddNewInstallation()
    {
        let installation = new Installation();
        installation.name = this.state.Name;
        
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
            Name: ''
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
                <CreateInstallationForm
                    onClick = {this.AddNewInstallation}
                    onChange = {this.handleChange}
                    State = {this.state}
                />
                <InstallationTable
                    Installations = {this.Installations}
                    OnEdit = {this.EditInstallation}
                    OnDelete = {this.DesactiveInstallation}
                />
            </React.Fragment>
        )
    }
}

export default InstallationViewModel;