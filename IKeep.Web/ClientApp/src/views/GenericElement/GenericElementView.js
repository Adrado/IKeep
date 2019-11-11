import React, {Fragment, useReducer} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useFetchGenericElement from './useFetchGenericElement';
import GenericElementForm from './GenericElementForm';
import DataTable from '../../components/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import {Functions} from '../../providers/Providers'
import GenericElement from '../../models/GenericElement';

import useFetchElementType from '../../views/ElementType/useFetchElementType'

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
  selectedRow: new GenericElement(),
};

const GenericElementView = () =>
{
    const classes = useStyles();
    const {fetchedGenericElement, error, onModify} = useFetchGenericElement();
    const {fetchedElementType} = useFetchElementType();
    const columns = [
      { title: 'Nombre', field: 'Name' },
      { title: 'Tipo', field: 'ElementTypeName'}
    ] 
    const title = "Tipos de Elementos"
    const [state, dispatch] = useReducer(reducer, initialState);

    

    return(
      <Fragment>
        <Functions.Provider value={{ state, dispatch }}>
          <GenericElementForm
            onModify = {onModify}
            />
          
          { fetchedGenericElement === null &&
            <CircularProgress className={classes.progress}/>
          }
          { error == true &&
            <h1>Error...</h1>
          }
          { fetchedGenericElement !== null &&
            <DataTable
              Title = {title}
              Data = {fetchedGenericElement}
              Columns = {columns}
              />  
          }
        </Functions.Provider>
      </Fragment>
    )
}

export default GenericElementView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));