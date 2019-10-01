import React, {Component} from 'react';
import CreateRoleForm from './CreateRoleForm';
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
        this.AddNewRole = this.AddNewRole.bind(this);
        this.EditRole = this.EditRole.bind(this);
        this.DesactiveRole = this.DesactiveRole.bind(this);

        this.RolesService = RoleService;
        this.GetAllRoles();
        this.render();
        this.GetAllRoles();
    }

    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
    }
        
    AddNewRole()
    {
        let role = new Role();
        role.name = this.state.Name;
        
        this.RolesService.AddAsync(role)
            .then((response) => { this.OnAddedRole(response); });

        this.CleanForm();
    }

    OnAddedRole(response)
    {
        let role = new Role (response.data);
        this.Roles.push(role);
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
            
            if(role.EntityStatus !== 0)  
                this.Roles.push(role);
        }
    }

    EditRole(newData, oldData)
    {
        this.RolesService.UpdateAsync(newData)
        .then((response) =>
        {
            this.OnUpdateRole(response);
        });
    }

    OnUpdateRole(response)
    {
        let role = new Role(response.data)
        let index = this.Roles.findIndex(x => x.Id === role.Id);
        this.Roles[index] = role;
    }
    
    DesactiveRole(entity)
    {
        entity.EntityStatus = 0;
        this.RolesService.UpdateAsync(entity)
        .then((response) =>
        {
            this.OnDesactiveRole(entity);
            console.log(response);
        });
    }

    OnDesactiveRole(entity)
    {
        let index = this.Roles.findIndex(x => x.Id === entity.Id);
        this.Roles.splice(index, 1);
    }

    render()
    {
        return(
            <React.Fragment>
                <CreateRoleForm
                    onClick = {this.AddNewRole}
                    onChange = {this.handleChange}
                    State = {this.state}
                />
                <RoleTable
                    Roles = {this.Roles}
                    OnEdit = {this.EditRole}
                    OnDelete = {this.DesactiveRole}
                />
            </React.Fragment>
        )
    }
}

export default RoleViewModel;