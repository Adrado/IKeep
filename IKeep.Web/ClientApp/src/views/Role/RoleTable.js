import React from 'react';
import MaterialTable from 'material-table';

let RoleTable = props =>
{
    let {Roles, OnEdit, OnDelete} = props;

    const [state] = React.useState({
        columns: 
        [
          { title: 'Nombre', field: 'Name' },
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
                  OnEdit(newData, oldData)
                  resolve();
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  OnDelete(oldData)
                  resolve();
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