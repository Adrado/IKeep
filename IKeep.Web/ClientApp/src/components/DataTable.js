import React from 'react';
import MaterialTable from 'material-table';

const DataTable = props =>
{
    const {Title, Data, OnEdit, OnDelete, Columns} = props;

    const [state] = React.useState({
        columns: Columns,
        data: Data
      });
    
    return (
        <MaterialTable
          title={Title}
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

export default DataTable;