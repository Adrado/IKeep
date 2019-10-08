import React, {Component} from 'react';
import CreateRoleForm from './CreateRoleForm';
import Role from '../../models/Role';
import RolesService from '../../services/RolesService';
import DataTable from '../../components/DataTable';


class RoleViewModel extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            Name : '',
        };

        this.Roles = [];
        this.HandleChange = this.HandleChange.bind(this);
        this.AddNewRole = this.AddNewRole.bind(this);
        this.EditRole = this.EditRole.bind(this);
        this.DesactiveRole = this.DesactiveRole.bind(this);
        // Cuándo es necesario¿?
        this.GetAllRoles = this.GetAllRoles.bind(this);

        //this.RolesService = RoleService;
        this.RolesService = new RolesService();
        this.ColumnsTable = [
            { title: 'Nombre', field: 'Name' },
          ];
        this.GetAllRoles();
    }

    HandleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
    }
        
    AddNewRole()
    {
        let role = new Role();
        role.Name = this.state.Name;
        
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

        this.CleanForm();
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
        this.CleanForm();
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
        this.CleanForm();
    }

    render()
    {
        return(
            <React.Fragment>
                <CreateRoleForm
                    onClick = {this.AddNewRole}
                    onChange = {this.HandleChange}
                    State = {this.state}
                />
                <DataTable
                    Title = "Roles"
                    Data = {this.Roles}
                    OnEdit = {this.EditRole}
                    OnDelete = {this.DesactiveRole}
                    Columns = {this.ColumnsTable}
                />
            </React.Fragment>
        )
    }
}

export default RoleViewModel;