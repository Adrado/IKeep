import React, {Fragment, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';


import {Functions} from '../../../providers/Providers'
import useFetchGElementGChores from './useFetchGElementGChores';


//Data Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../../components/MaterialTableProps'
import useGElementGChoreViewModel from './useGElementGChoreViewModel';


const GElementGChoresTable = ({displayTable}) => 
{
  const classes = useStyles();
  const {state, dispatch} = useContext(Functions)
  
  const {GElementGChores, change, setChange} = useFetchGElementGChores(state.selectedRow.Id, state.change);
  const [AddGElementGChore, SaveGElementGChore, DeleteGElementGChore] = useGElementGChoreViewModel();

  const AddChores = () =>
  {
    dispatch({ type: 'ADD_TASKS', data: GElementGChores});
  }

  const DeleteRows = () =>
  {
    dispatch({ type: 'TASKS_ADDED', data: !state.change});
  }

  const columns = [
      { title: 'Estado', field: 'Status', lookup: { 0: 'Inactivo', 1: 'Activo' }},
      { title: 'Tarea', field: 'GenericChoreDescription', editable: 'never'},
  ]

    return(
        <Fragment>
          {GElementGChores !== null &&
            <MaterialTable
                title = {state.selectedRow.Name}
                columns={columns}
                data={GElementGChores}

                actions={[
                  {
                    icon: 'add',
                    tooltip: 'Añadir Tareas',
                    isFreeAction: true,
                    onClick: (event) => {
                      AddChores();
                      displayTable();
                    }
                  }
                ]}

                options={{
                  actionsColumnIndex: -1,
                  filtering: true,
                  toolbar: true,
                  search: false,
                  pageSize: 10,
                  pageSizeOptions: [10, 20],
                  //selection: true,
                }}

                localization={localizationEsp}

                editable={{
                  onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    SaveGElementGChore(oldData, newData)
                    .then(() => {
                      setChange(!change)
                      resolve()
                    })
                  }),

                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      DeleteGElementGChore(oldData)
                      .then(() => {
                        setChange(!change);
                        DeleteRows();
                        resolve()
                      })
                    }),
                }}
              />
              }
        </Fragment>
    );
}

export default GElementGChoresTable;


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
      margin: theme.spacing(1),
    },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  progress: {
    margin: theme.spacing(2),
  },
}));
