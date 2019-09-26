import React, {Component} from 'react';
import RoleView from './RoleView';
import Role from '../../models/Role'
import RolesService from '../../services/RolesService'

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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.AddNewRole = this.AddNewRole.bind(this);

        this.RolesService = RoleService;
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
        this.CreateRole(role)
    }

    GetAllRoles()
    {
        this.RolesService.GetAllAsync()
        .then((response) =>
            {
                console.log(response);
                //this.OnGetData(response);
            });
    }

    CreateRole(role)
    {
        this.RolesService.AddAsync(role)
            .then((response) =>
            {
                console.log(response);
            });
    }

    render()
    {
        return(
            <RoleView
            onClick = {this.AddNewRole}
            onChange = {this.handleChange}
            State = {this.state}
            />
        )
    }
}

export default RoleViewModel;