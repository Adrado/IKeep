import React, {Component} from 'react';
import CreateRoleView from './CreateRoleView';
import Role from '../../models/Role';
import RolesService from '../../services/RolesService';
import RoleTable from './RoleTable';

let RoleService = new RolesService();

class RoleViewModel extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            Name : ''
        };

        this.Roles = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.AddNewRole = this.AddNewRole.bind(this);

        this.RolesService = RoleService;
        this.GetAllRoles();
    }

    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
    }

    handleSubmit()
    {
        alert("A name was submited: " + this.state.Name + " " + this.state.FirstSurname);
    }
        
    AddNewRole()
    {
        let role = new Role();
        role.name = this.state.Name;
        this.CreateRole(role);
        this.CleanForm();
    }

    CleanForm()
    {
        this.setState({
            Name: ''
          });
    }

    GetAllRoles()
    {
        this.RolesService.GetAllAsync()
        .then((response) =>
            {
                console.log(response);
                this.OnGetData(response);
            });
    }

    OnGetData(response)
    {
        this.Roles.length = 0;
        for (let i in response.data)
        {
            let role = new Role(response.data[i]);
            this.Roles.push(role);
        }
        console.log(this.Roles)
    }

    CreateRole(role)
    {
        this.RolesService.AddAsync(role)
            .then((response) =>
            {
                console.log(response);
                alert("K");
            });
    }

    render()
    {
        return(
            <React.Fragment>
                <CreateRoleView
                    onClick = {this.AddNewRole}
                    onChange = {this.handleChange}
                    State = {this.state}
                />
                <RoleTable
                    Roles = {this.Roles}
                />
            </React.Fragment>
        )
    }
}

export default RoleViewModel;