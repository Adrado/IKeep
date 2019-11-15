import React, {Fragment, useReducer} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useFetchPriority from './useFetchPriority';
import PriorityForm from './PriorityForm';
import DataTable from '../../components/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import {Functions} from '../../providers/Providers'
import Priority from '../../models/Priority';

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
  selectedRow: new Priority(),
};

const PriorityView = () =>
{
    const classes = useStyles();
    const {fetchedPriority, error, onModify} = useFetchPriority();
    const columns = [
      { title: 'Nombre', field: 'Name' }
    ] 
    const title = "Tipos de Elementos"
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
      <Fragment>
        <Functions.Provider value={{ state, dispatch }}>
          <PriorityForm
            //elementTypeData = {selectedRow}
            onModify = {onModify}/>
          
          { fetchedPriority === null &&
            <CircularProgress className={classes.progress}/>
          }
          { error === true &&
            <h1>Error...</h1>
          }
          { fetchedPriority !== null &&
            <DataTable
              Title = {title}
              Data = {fetchedPriority}
              Columns = {columns}
              />  
          }
        </Functions.Provider>
      </Fragment>
    )
}

export default PriorityView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));