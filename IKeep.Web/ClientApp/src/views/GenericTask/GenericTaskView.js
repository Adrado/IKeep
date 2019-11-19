import React, {Fragment, useReducer} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useFetchGenericTask from './useFetchGenericTask';
import GenericTaskForm from './GenericTaskForm';
import DataTable from '../../components/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import {Functions} from '../../providers/Providers'
import GenericTask from '../../models/GenericTask';

function reducer(state, action) {
  switch (action.type) {
      case 'SELECT_ROW':
          return {
              selectedRow: action.data
          };

      default:
          return initialState;
  }
}

const initialState = {
  selectedRow: new GenericTask(),
};

const Periodicity = Object.freeze({
  0 : "Diaria",
  1 : "Semanal",
  2 : "Mensual",
  3 : "Bimensual",
  4 : "Cuatrimestral",
  5 : "Semestral",
  6 : "Anual",
  7 : "Bianual",
  8 : "Cuatrianual"
})
const GenericTaskView = () =>
{
    const classes = useStyles();
    const {fetchedGenericTask, error, onModify} = useFetchGenericTask();
    const columns = [
      { title: 'Ref', field: 'Ref' },
      { title: 'Descripción', field: 'Description' },
      { title: 'Periodicidad', field: 'Period', lookup: Periodicity},
      { title: 'Duración', field: 'Duration'},
      { title: 'Formato', field: 'FormatName'},
      { title: 'Prioridad', field: 'PriorityName'},
      { title: 'Categoria', field: 'CategoryName'}
    ] 
    const title = "Tipos de Elementos"
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
      <Fragment>
        <Functions.Provider value={{ state, dispatch }}>
          <GenericTaskForm
            //genericTaskData = {selectedRow}
            onModify = {onModify}/>
          
          { fetchedGenericTask === null &&
            <CircularProgress className={classes.progress}/>
          }
          { error === true &&
            <h1>Error...</h1>
          }
          { fetchedGenericTask !== null &&
            <DataTable
              Title = {title}
              Data = {fetchedGenericTask}
              Columns = {columns}
              />  
          }
        </Functions.Provider>
      </Fragment>
    )
}

export default GenericTaskView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));