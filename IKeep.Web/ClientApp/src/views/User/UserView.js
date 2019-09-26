import React from 'react';

var UserView = props =>
{
    var {onClick, onChange, State} = props;

    return(
        <div>
          <label>
            Name: 
          <input id="Name" type="text" onChange = {onChange} value = {State.Name}/>
          </label>
          <label>
            First Surname: 
          <input id="FirstSurname" type="text" onChange = {onChange} value = {State.FirstSurname}/>
          </label>
          <input onClick = {onClick} type="button" value="Send" />
          
        </div>
  )
}

export default UserView;

