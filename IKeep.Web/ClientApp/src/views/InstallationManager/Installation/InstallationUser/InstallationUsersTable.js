//Core
import React, {Fragment, useState} from 'react';

//CRUD Services
import useFetchInstallationUsers from './useFetchInstallationUsers';
import useInstallationUserViewModel from '../../../InstallationUser/useInstallationUserViewModel';

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../../../components/MaterialTableProps';

//Dialog
import AddInstallationUsersDialog from './AddInstallationUsersDialog';

//Style components
import {CircularProgress, makeStyles} from '@material-ui/core';

//Validation
import PropTypes from 'prop-types';

const InstallationUsersTable = ({installationId}) => 
{
  const classes = useStyles();
  
  const {InstallationUsers, change, setChange} = useFetchInstallationUsers(installationId);
  const [, Save, Delete] = useInstallationUserViewModel();
  const [, setRow] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  //Info to InstallationUsers Table 
  const LookupState = Object.freeze({
    0: "Inactivo",
    1: "Activo"
  });
  
  const columns = [
    { title: 'Estado', field: 'EntityStatus', lookup: LookupState },
    { title: 'Usuario', field: 'UserFullName', editable: 'never'},
    { title: 'Rol', field: 'RoleId',  },
    //{ title: 'Instalación', field: 'InstallationName', editable: 'never'},
    ];

  const Title = "Usuarios";
  
    return(
        <Fragment>
          {InstallationUsers === null &&
              <CircularProgress className={classes.progress}/>
          }
          {InstallationUsers !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={InstallationUsers}
              //onRowClick={((evt, selectedRow) => setRow(selectedRow))}

              options={{
                actionsColumnIndex: -1,
                filtering: true,
                toolbar: true,
                pageSize: 5,
                pageSizeOptions: [5, 10, 20],
                /*rowStyle: rowData => ({
                  backgroundColor: (row.tableData && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                }) */
              }}

              actions={[
                {
                  icon: 'add',
                  isFreeAction: true,
                  tooltip: 'Añadir Usuarios',
                  onClick: () => handleClickOpen()
                }
              ]}

              onRowClick={((evt, selectedRow) => 
                {
                  //AddInstallationUsersDialog()
                  setRow(selectedRow) 
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

        {InstallationUsers !== null &&
        <AddInstallationUsersDialog
            open = {open}
            handleClose = {handleClose}
            installationId = {installationId}
            change = {change}
            setChange = {setChange}
          />
        }
        </Fragment>
  )                
}

export default InstallationUsersTable;

InstallationUsersTable.propTypes = {
  handleClickOpen: PropTypes.func.isRequired, 
  installationId: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));