import React, {Fragment, useContext, useState} from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core' 

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../../../components/MaterialTableProps'

//Contexts
//import {Functions} from '../../../../providers/Providers';

//CRUD Services
import useFetchElements from './useFetchElements';
import useElementViewModel from './useElementViewModel';
import useFetchElementType from '../../../ElementType/useFetchElementType';

import AddElementsDialog from './AddElementsDialog';


const ElementsTable = ({areaId, handleClickOpen}) => 
{
  const classes = useStyles();

  const {ETypes} = useFetchElementType();
  console.log(areaId)
  const {Elements, change, setChange} = useFetchElements(areaId);
  const [Add, Save, Delete] = useElementViewModel();
  const [row, setRow] = useState(null);
   
  /* const BuildField = (Data) =>
  {
    let lookup = {}
    for (let i in Data)
    {
      let data = Data[i];
      lookup[data.Id] = data.Name;
    }
    return lookup;
  } */

  //Info to Elements Table 
  const LookupState = 
  {
    0: "Inactivo",
    1: "Activo"
  };
  
  const columns = [
    { title: 'Estado', field: 'Status', lookup: LookupState },
    { title: 'Ref', field: 'Ref' },
    { title: 'Nombre', field: 'Name' },
    { title: 'Tipo', field: 'ElementTypeName'},
    { title: 'Marca', field: 'Brand' },
    { title: 'Modelo', field: 'Model' },
    { title: 'Descripción', field: 'Description' },
    { title: 'Salud&Seg', field: 'SafetyAndHealth' },
    ] 
  const Title = "Elementos";
  
    return(
        <Fragment>
          {Elements === null &&
              <CircularProgress className={classes.progress}/>
          }
          {Elements !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={Elements}
              //onRowClick={((evt, selectedRow) => setRow(selectedRow))}

              options={{
                actionsColumnIndex: -1,
                filtering: true,
                toolbar: true,
                pageSize: 8,
                pageSizeOptions: [10, 20],
                rowStyle: rowData => ({
                  backgroundColor: (row.tableData && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
              }}

              actions={[
                {
                  
                  icon: 'add',
                  isFreeAction: true,
                  tooltip: 'Añadir Tareas',
                  onClick: (evt, data) => handleClickOpen()
                }
              ]}

              onRowClick={((evt, selectedRow) => 
                {
                  AddElementsDialog()
                  setRow(selectedRow) 
                }
                )}

              localization={localizationEsp}

              editable={{
                /* onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                      Add(newData)
                      .then(() => {
                        setChange(!change)
                        resolve()
                        })
                  }), */

                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    Save(oldData, newData)
                    .then(() => {
                      setChange(!change)
                      resolve()
                    })
                  }),

                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    Delete(oldData)
                    .then(() => {
                      setChange(!change)
                      resolve()
                    })
                  }),
              }}
          />
          }
        </Fragment>
  )                
}

export default ElementsTable;

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));