import React, {Fragment, useReducer} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useFetchElementType from './useFetchElementType';
import ElementTypeForm from './ElementTypeForm';
import DataTable from '../../components/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import {Functions} from '../../providers/Providers'
import ElementType from '../../models/ElementType';

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
  selectedRow: new ElementType(),
};

const ElementTypeView = () =>
{
    const classes = useStyles();
    const {fetchedElementType, error, onModify} = useFetchElementType();
    const columns = [
      { title: 'Ref', field: 'Ref' },
      { title: 'Nombre', field: 'Name' }
    ] 
    const title = "Tipos de Elementos"
    const [state, dispatch] = useReducer(reducer, initialState);

    

    return(
      <Fragment>
        <Functions.Provider value={{ state, dispatch }}>
          <ElementTypeForm
            //elementTypeData = {selectedRow}
            onModify = {onModify}/>
          
          { fetchedElementType === null &&
            <CircularProgress className={classes.progress}/>
          }
          { error == true &&
            <h1>Error...</h1>
          }
          { fetchedElementType !== null &&
            <DataTable
              Title = {title}
              Data = {fetchedElementType}
              Columns = {columns}
              />  
          }
        </Functions.Provider>
      </Fragment>
    )
}

export default ElementTypeView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));