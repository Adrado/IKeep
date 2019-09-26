import React from 'react';

var RoleView = props =>
{
    var {onClick, onChange, State} = props;
    return(
        <div>
            <label>
                Name:
                <input id="Name" type="text" onChange = {onChange} value = {State.Name}/>
            </label>
            <input onClick = {onClick} type = "button" value="Add" />
        </div>
    )
}

export default RoleView;