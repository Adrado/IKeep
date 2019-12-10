//Core
import React from 'react';

//Styles components
import {makeStyles, Button, Dialog, AppBar, Toolbar, Typography, Slide} from '@material-ui/core';

//Table
import MaterialTable from 'material-table';
import { localizationEsp } from '../../../../components/MaterialTableProps';

//ViewModels
import useInstallationUserViewModel from '../../../InstallationUser/useInstallationUserViewModel';

//Validation
import PropTypes from 'prop-types';

import useFetchUsers from '../../../User/useFetchUsers';
import useFetchRoles from '../../../Role/useFetchRoles';
import useTempData from './useTempData';
import InstallationUser from '../../../../models/InstallationUser';


export default function AddInstallationUsersDialog({open, handleClose, installationId, installationUsers, change, setChange})
{
  const classes = useStyles();

  const {Users} = useFetchUsers();
  //const {Roles} = useFetchRoles();
  const [Add] = useInstallationUserViewModel();
  const [tempData, setTempData] = useTempData(Users, installationId);
  const AddUsers = (data) =>
  {
    let installationUsersPromises = [];
    //let tasksPromises = [];
    for (let i in data)
    {
      console.log(data[i])
      installationUsersPromises.push(Add(installationId, data[i].UserId, data[i].RoleId));
    }
    Promise.all(installationUsersPromises)
    .then((values) => 
    {
        setChange(!change)
        handleClose();
    });
  }

  /* const BuildField = (Data) =>
  {
    let lookup = {};
    for (let i in Data)
    {
      let data = Data[i];
      lookup[data.Id] = data.Name;
    }
    return lookup;
  } */
  
  //Info to GenericInstallationUsers Table 
  //const LookupRoles = BuildField(Roles);
  const columns = [
    { title: 'Nombre', field: 'UserName', editable: 'always' },
    //{ title: 'Rol', field: 'RoleId', lookup: LookupRoles}
    ] 
  const Title = "Usuarios";

  const isSelected = (rowData) =>
  {
    let result = installationUsers.find(installationUser => installationUser.UserId === rowData.UserId);

    if (result !== undefined && result !== null && result.UserId === rowData.UserId)
      return true;
    else
      return false;
  }

  return (
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Descartar
            </Button>
            <Typography variant="h6" className={classes.title}>
              
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar Cambios
            </Button> */}
          </Toolbar>
        </AppBar>
        {tempData !== null &&
        <MaterialTable
          data = {tempData}
          columns = {columns}
          title = {Title}
          localization={localizationEsp}
          options={{
            
            //actionsColumnIndex: -1,
            //filtering: true,
            toolbar: true,
            showSelectAllCheckbox: false,
            pageSize: 10,
            pageSizeOptions: [10, 20],
            selection: true,
            selectionProps: rowData => ({
              disabled: isSelected(rowData)
            }),  
            /* rowStyle: rowData => ({
              backgroundColor: (row.tableData && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
            }) */
          }}

         actions={[
            {
              icon: 'add',
              tooltip: 'Asignar Usuarios',
              onClick: (evt, data) => AddUsers(data)
            }
          ]}
        
         /* editable={{
        onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  let data = tempData;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  setTempData(data);
                  console.log(data);
                  resolve()
                }),
              }} */ 
        />
        }
      </Dialog>
  );
}

AddInstallationUsersDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired, 
  installationId: PropTypes.string.isRequired,
  installationUsers: PropTypes.arrayOf(PropTypes.instanceOf(InstallationUser)),
  change: PropTypes.bool.isRequired,
  setChange: PropTypes.func.isRequired,
};

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});