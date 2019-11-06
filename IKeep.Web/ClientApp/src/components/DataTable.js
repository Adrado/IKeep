import React from 'react';
import MaterialTable from 'material-table';

const DataTable = ({Data, Columns, Select}) =>
{

    return (
        <MaterialTable
          title = " "
          columns={Columns}
          data={Data}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar',
              onClick: (event, rowData) => {Select(event, rowData)}
            }
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
      );
}

export default DataTable;