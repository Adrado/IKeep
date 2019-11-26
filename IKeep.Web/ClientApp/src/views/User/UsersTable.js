import React, {Fragment, useContext, useState} from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core';

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../components/MaterialTableProps';

//Contexts
import {Functions} from '../../providers/Providers';

//CRUD Services
import useFetchUsers from './useFetchUsers';
import useUserViewModel from './useUserViewModel';
import useFetchRoles from '../Role/useFetchRoles';


const UsersTable = () => 
{
  const classes = useStyles();
  const {state, dispatch} = useContext(Functions);

  const Select = (e, rowData) =>
  {
    dispatch({ type: 'SELECT_ROW', data: rowData,});
  }

  const {Users, change, setChange} = useFetchUsers();
  const [Add, Save, Delete] = useUserViewModel();
  const [row, setRow] = useState(state.selectedRow);
  const{Roles} = useFetchRoles();

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

   
  //Info to Users Table 
  const LookupRoles = BuildField(Roles);

  const columns = [
    { title: 'Usuario', field: 'LoginName' },
    { title: 'Contraseña', field: 'Password' },
    { title: 'Rol', field: 'RoleId', lookup: LookupRoles},
    { title: 'Nombre', field: 'Name' },
    { title: 'Primer Apellido', field: 'FirstSurname' },
    { title: 'Segundo Apellido', field: 'SecondSurname' },
    { title: 'DNI', field: 'DNI' },
    { title: 'Fijo', field: 'Phone' },
    { title: 'Móvil', field: 'Phone2' },
    { title: 'Correo', field: 'Email' },
    { title: 'Lugar de Nacimiento', field: 'Birthplace' },
    { title: 'Fecha de Nacimiento', field: 'Birthdate', type: 'date' },
    { title: 'Ciudad', field: 'City' },
    { title: 'Dirección', field: 'Address' }
  ] 

  const Title = "Usuarios";
  
    return(
        <Fragment>
          {Users === null &&
              <CircularProgress className={classes.progress}/>
          }
          { Users !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={Users}
              //onRowClick={((evt, selectedRow) => setRow(selectedRow))}

              options={{
                actionsColumnIndex: -1,
                filtering: true,
                toolbar: true,
                pageSize: 10,
                pageSizeOptions: [10, 20],
                rowStyle: rowData => ({
                  backgroundColor: (row.tableData && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
              }}

              onRowClick={((evt, selectedRow) => 
                { 
                Select(evt, selectedRow);
                setRow(selectedRow) 
                }
                )}

              localization={localizationEsp}

              editable={{
                onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                      Add(newData)
                      .then(() => {
                        setChange(!change)
                        resolve()
                        })
                  }),

                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    Save(oldData, newData)
                    .then((response) => {
                      console.log(response)
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

export default UsersTable;

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));