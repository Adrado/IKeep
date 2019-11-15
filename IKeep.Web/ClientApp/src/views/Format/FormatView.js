import React, {Fragment, useReducer} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useFetchFormat from './useFetchFormat';
import FormatForm from './FormatForm';
import DataTable from '../../components/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import {Functions} from '../../providers/Providers'
import Format from '../../models/Format';

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
  selectedRow: new Format(),
};

const FormatView = () =>
{
    const classes = useStyles();
    const {fetchedFormat, error, onModify} = useFetchFormat();
    const columns = [
      { title: 'Nombre', field: 'Name' }
    ] 
    const title = "Tipos de Elementos"
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
      <Fragment>
        <Functions.Provider value={{ state, dispatch }}>
          <FormatForm
            //elementTypeData = {selectedRow}
            onModify = {onModify}/>
          
          { fetchedFormat === null &&
            <CircularProgress className={classes.progress}/>
          }
          { error === true &&
            <h1>Error...</h1>
          }
          { fetchedFormat !== null &&
            <DataTable
              Title = {title}
              Data = {fetchedFormat}
              Columns = {columns}
              />  
          }
        </Functions.Provider>
      </Fragment>
    )
}

export default FormatView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));