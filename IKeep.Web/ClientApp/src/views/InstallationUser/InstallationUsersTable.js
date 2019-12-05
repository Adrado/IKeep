import React, {Fragment, useContext, useState} from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core';

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../components/MaterialTableProps';

//Contexts
import {Functions} from '../../providers/Providers';

//CRUD Services
import useFetchInstallationUsers from './useFetchInstallationUsers';
import useInstallationUserViewModel from './useInstallationUserViewModel';
import AddInstallationUserDialog from './AddInstallationDialog';


const InstallationUsersTable = () => 
{
  const classes = useStyles();
  const {state, dispatch} = useContext(Functions);

  const Select = (e, rowData) =>
  {
    dispatch({ type: 'SELECT_ROW', data: rowData,});
  }

  const {InstallationUsers, change, setChange} = useFetchInstallationUsers();
  const [Add, Save, Delete] = useInstallationUserViewModel();
  const [row, setRow] = useState(state.selectedRow);

  const [open, setOpen] = useState(false);
  const [changes, setChanges] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const Estado = Object.freeze({
    0 : "Inactivo",
    1 : "Activo",
  })
  const columns = [
    { title: 'Estado', field: 'EntityStatus', lookup: Estado },
    { title: 'Usuario', field: 'UserName' },
    { title: 'Instalación', field: 'InstalationName' },
  ] 

  const Title = "Usuarios";
  
    return(
        <Fragment>
          {InstallationUsers === null &&
              <CircularProgress className={classes.progress}/>
          }
          { InstallationUsers !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={InstallationUsers}
              //onRowClick={((evt, selectedRow) => setRow(selectedRow))}

              options={{
                //actionsColumnIndex: -1,
                filtering: true,
                toolbar: true,
                pageSize: 10,
                pageSizeOptions: [10, 20],
                rowStyle: rowData => ({
                  backgroundColor: (row.tableData && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
              }}

              actions={[
                {
                  icon: 'add',
                  isFreeAction: true,
                  tooltip: 'Añadir Elementos',
                  onClick: () => handleClickOpen()
                }
              ]}

              onRowClick={((evt, selectedRow) => 
                { 
                Select(evt, selectedRow);
                setRow(selectedRow); 
                }
                )}

              localization={localizationEsp}

              editable={{

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
          <AddInstallationUserDialog
            open = {open}
            handleClose = {handleClose}  
            change = {changes}
            setChange = {setChanges}
          />
        </Fragment>
  )                
}

export default InstallationUsersTable;

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));