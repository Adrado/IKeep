import React from 'react';
import MaterialTable from 'material-table';

let RoleTable = props =>
{
    let {Roles, OnEdit} = props;

    const [state, setState] = React.useState({
        columns: 
        [
          { title: 'Name', field: 'Name' },
        ],
        data: Roles
      });
    
    return (
        <MaterialTable
          title="Roles"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  {OnEdit(newData, oldData)}
                  resolve();
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  setState({ ...state, data });
                }, 600);
              }),
          }}
          options={{
            actionsColumnIndex: -1
          }}
        />
      );
}

export default RoleTable;