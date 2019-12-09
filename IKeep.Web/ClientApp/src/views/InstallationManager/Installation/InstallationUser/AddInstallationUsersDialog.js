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


export default function AddInstallationUsersDialog({open, handleClose, installationId, change, setChange})
{
  const classes = useStyles();

  const {Users} = useFetchUsers();
  const {Roles} = useFetchRoles();
  const [Add] = useInstallationUserViewModel();
  
  

  /* const AddSelectedGInstallationUsers = (data) =>
  {
    let installationUsersPromises = [];
    let tasksPromises = [];
    for (let i in data)
    {
      installationUsersPromises.push(Add(areaId, data[i]));
    }
    Promise.all(installationUsersPromises)
    .then((values)=> {
      for (let j = 0; j<values.length; j++)
      {
        let installationUserCreated = new InstallationUser(values[j].data);
        for (let k in data)
        {
          let gInstallationUser = data[k];
          if(installationUserCreated.GenericInstallationUserId === gInstallationUser.Id)
          {
            for( let m = 0; m < gInstallationUser.GenericInstallationUserGenericTasks.length; m++)
            {
              let gInstallationUserGTask = new GenericInstallationUserGenericTask(gInstallationUser.GenericInstallationUserGenericTasks[m]);
              tasksPromises.push(AddInstallationUserGTask(installationUserCreated.Id, gInstallationUserGTask))
            }
          }
        }
      }
    });

    Promise.all(tasksPromises).then(()=>
      {
        setChange(!change)
        handleClose();
      });
  } */

  const BuildField = (Data) =>
  {
    let lookup = {}
    for (let i in Data)
    {
      let data = Data[i];
      lookup[data.Id] = data.Name;
    }
    return lookup;
  }
  
  //Info to GenericInstallationUsers Table 
 // const LookupTypes = BuildField(ETypes);
  const columns = [
    { title: 'Nombre', field: 'Name', editable: 'always' },
    //{ title: 'Tipo', field: 'InstallationUserTypeId', lookup: LookupTypes}
    ] 
  const Title = "Usuarios";
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
        {Users !== null &&
        <MaterialTable
          data = {Users}
          columns = {columns}
          title = {Title}
          localization={localizationEsp}
          options={{
            selection: true,
            actionsColumnIndex: -1,
            filtering: true,
            toolbar: true,
            showSelectAllCheckbox: false,
            pageSize: 10,
            pageSizeOptions: [10, 20],
            /* rowStyle: rowData => ({
              backgroundColor: (row.tableData && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
            }) */
          }}

         actions={[
            {
              icon: 'add',
              tooltip: 'Asignar Usuarios',
              //onClick: (evt, data) => AddSelectedGInstallationUsers(data)
            }
          ]}
          
          //onSelectionChange={(rows) => console.log(rows)}
        />
        }
      </Dialog>
  );
}

AddInstallationUsersDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired, 
  installationId: PropTypes.string.isRequired,
  change: PropTypes.bool.isRequired,
  setChange: PropTypes.func.isRequired
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