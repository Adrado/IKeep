import React from 'react';
import MaterialTable from 'material-table';

let RoleTable = props =>
{
    let {Roles} = props;
    console.log({Roles});

    const [state, setState] = React.useState({
        columns: 
        [
          { title: 'Name', field: 'Name' },
        ],
        data: Roles
      });
    
    return (
        <MaterialTable
          title="Editable Example"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.push(newData);
                  setState({ ...state, data });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });
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
        />
      );
}

export default RoleTable;