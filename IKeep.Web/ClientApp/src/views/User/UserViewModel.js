import React, {Component} from 'react';
/* import axios from 'axios'; */
import UserView from'./UserView';
//import User from '../../../index';
import User from '../../models/User';
import UsersService from '../../services/UsersService';

let UserService = new UsersService();

class UserViewModel extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
            {
                LoginName : '',
                Password : '',
                Name : '',
                FirstSurname : '',
                SecondSurname : '',
                DNI : '',
                Phone : '',
                Phone2 : '',
                Email : '',
                Birthplace : '',
                Birthdate : '',
                City : '',
                Address : ''
            };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.AddNewUser = this.AddNewUser.bind(this);

        this.UsersService = UserService;
    }

    handleChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
    }

    handleSubmit()
    {
        alert("A name was submited: " + this.state.Name + " " + this.state.FirstSurname);
    }

    AddNewUser()
    {
        let user = new User();
        user.Name = this.state.Name;
        user.FirstSurname = this.state.FirstSurname;
        user.SecondSurname = this.state.SecondSurname;
        user.DNI = this.state.DNI;
        user.Phone = this.state.Phone;
        user.Phone2 = this.state.Phone2;
        user.Email = this.state.Email;
        user.Birthplace = this.state.Birthplace;
        user.Birthdate = this.state.Birthdate;
        user.City = this.state.City;
        user.Address = this.state.Address;

        this.CreateUser(user)
    }

    GetAllUsers()
    {
        this.UsersService.GetAllAsync()
            .then((response) =>
            {
                console.log(response);
                //this.OnGetData(response);
            });
    }

    CreateUser(user)
    {
        this.UsersService.AddAsync(user)
        .then((response) =>
            {
                console.log(response);
                //this.OnGetData(response);
            });
    }

    render() {
        return (
          <UserView
            onClick = {this.AddNewUser}
            onChange = {this.handleChange}
            State = {this.state}
            />
        );
      }
}

export default UserViewModel;
