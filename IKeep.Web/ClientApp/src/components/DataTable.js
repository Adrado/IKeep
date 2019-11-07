import React, {useContext} from 'react';
import MaterialTable from 'material-table';
import {Functions} from '../providers/Providers'

const DataTable = ({Title, Data, Columns}) =>
{
  const {state, dispatch} = useContext(Functions)
  const Select = (e, rowData) =>
  {
    dispatch({ type: 'SELECT_ROW', data: rowData,});
  }
  
  return (
      <MaterialTable
        title = {Title}
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
          actionsColumnIndex: -1,
          filtering: true,
          toolbar: false,
          pageSize: 10,
          pageSizeOptions: [10, 20]
        }}

        localization={{
          header: {
            actions: ' '
          },
          body: {
            emptyDataSourceMessage: 'Guherandinên ku tiştek tune',
            filterRow:{
              filterTooltip: 'Filtrar'
            }
          },
          toolbar: {
            searchTooltip: 'Buscar',
            searchPlaceholder: 'Buscar'
          },
          pagination: {
            labelRowsSelect: 'Filas',
            labelDisplayedRows: ' {from}-{to} de {count}',
            firstTooltip: 'Primera página',
            previousTooltip: 'Anterior página',
            nextTooltip: 'Siguiente página',
            lastTooltip: 'Última página'
          }
        }}

      />
    );
}

export default DataTable;