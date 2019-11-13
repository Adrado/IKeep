import React, {Fragment, useReducer} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Grid} from '@material-ui/core' 

import useFetchGenericElement from './useFetchGenericElement';
import GenericElementForm from './GenericElementForm';
import DataTable from '../../components/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import {Functions} from '../../providers/Providers'
import GenericElement from '../../models/GenericElement';

//import {Services, CRUD} from '../../providers/Providers';

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
    const title = "Elementos Genéricos";
    const [state, dispatch] = useReducer(reducer, initialState);

    

    return(
      <Fragment>
        <Grid container spacing={3}>
          <Functions.Provider value={{ state, dispatch }}>
            <Grid item xs={6}>
              { fetchedGenericElement === null &&
                <CircularProgress className={classes.progress}/>
              }
              { error === true &&
                <h1>Error...</h1>
              }
              { fetchedGenericElement !== null &&
                <DataTable
                  Title = {title}
                  Data = {fetchedGenericElement}
                  Columns = {columns}
                  />  
              }
            </Grid>
            <Grid item xs={6}>
              {fetchedElementType === null &&
                <CircularProgress className={classes.progress}/>
              }
              {fetchedElementType !== null &&
                <GenericElementForm
                onModify = {onModify}
                selectorData = {fetchedElementType}
                />
              }

            </Grid>
          </Functions.Provider>
        </Grid>
      </Fragment>
    )
}

export default GenericElementView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));