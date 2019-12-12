import React, {Fragment, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

//DataTable
import MaterialTable from 'material-table';
import {localizationEsp} from '../../../components/MaterialTableProps';

//Reducers
import {Functions} from '../../../providers/Providers';

//CRUD Services
import useFetchGenericChore from '../../GenericChore/useFetchGenericChore';
import useGElementGChoreViewModel from '../GElementGChore/useGElementGChoreViewModel';

//Validations


const GenericChoresTable = ({displayTable}) => 
{
  //const classes = useStyles();
  const {state, dispatch} = useContext(Functions);

  const GElementSelected = state.selectedRow;
  
  const {GChores} = useFetchGenericChore();

  const tasksAdded = () =>
  {
    dispatch({ type: 'TASKS_ADDED', data: !state.change});
  }

  const [Add] = useGElementGChoreViewModel();

  const AddSelectedChores = (data) =>
  {
    let p = [];
    for (let i in data)
    {
      p.push(Add(GElementSelected.Id, data[i]));
    }

    Promise.all(p).then(()=> {
      tasksAdded();
      displayTable();
    })
  }

  const Periodicity = Object.freeze({
    0 : "Diaria",
    1 : "Semanal",
    2 : "Mensual",
    3 : "Bimensual",
    4 : "Trimestral",
    5 : "Semestral",
    6 : "Anual",
    7 : "Bianual",
    8 : "Cuatrianual"
  })

  const columns = [
      { title: 'Tarea', field: 'Description'},
      { title: 'Periodicidad', field: 'Period', lookup: Periodicity},
      { title: 'Formato', field: 'FormatName'},
      { title: 'Prioridad', field: 'PriorityName'},
      { title: 'Categoria', field: 'CategoryName'}

  ]
  const Title = "Tareas";

  const isSelected = (rowData) =>
  {
    let result = state.tasks.find(task => task.GenericChoreId === rowData.Id);

    if (result !== undefined && result !== null && result.GenericChoreId === rowData.Id)
      return true;
    else
      return false;
  }

  useEffect(() =>
  {
       
  },[state]);

    return(
        <Fragment>
          { GChores !== null &&
            <MaterialTable
            title = {Title}
            columns={columns}
            data={GChores}

            actions={[
              {
                icon: 'add',
                tooltip: 'Añadir Tareas',
                onClick: (evt, data) => AddSelectedChores(data)
              },
              {
                //icons at https://material-ui.com/es/components/material-icons/, if "ArrowBack", change to "arrow_back"
                icon: 'arrow_back',
                tooltip: 'Volver',
                isFreeAction: true,
                onClick: () => displayTable()
              }
            ]}

            options={{
              actionsColumnIndex: -1,
              filtering: true,
              toolbar: true,
              pageSize: 10,
              pageSizeOptions: [10, 20],
              showSelectAllCheckbox: false,
              selection: true,
              selectionProps: rowData => ({
                disabled: isSelected(rowData)
              }),       
              search: true
            }}

            localization={localizationEsp}
          />
          }
        </Fragment>
  )                
}

export default GenericChoresTable;

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