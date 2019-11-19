import React, {Fragment, useReducer} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Grid} from '@material-ui/core' 

//Contexts
import {Functions} from '../../providers/Providers'

//Models
import GenericElement from '../../models/GenericElement';

//Forms
import GenericElementForm from './GenericElementForm';
import GElementGTaskForm from './GElementGTask/GElementGTaskForm';

//Components
import DataTable from '../../components/DataTable';

//Hooks CRUD Data
import useFetchElementType from '../../views/ElementType/useFetchElementType';
import useFetchGenericElement from './useFetchGenericElement';

//Allows comunicate Form with Table
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
    const [state, dispatch] = useReducer(reducer, initialState);

    //Info to Table
    const columns = [
      { title: 'Nombre', field: 'Name' },
      { title: 'Tipo', field: 'ElementTypeName'}
    ] 
    const title = "Elementos Genéricos";

    return(
      <Fragment>
        <Grid container spacing={3}>
          <Functions.Provider value={{ state, dispatch }}>
            <Grid item sm={4} xs={12}>
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

            <Grid item sm={4} xs={12}>
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

            <Grid item sm={4} xs={12}>
              
                <GElementGTaskForm/>
              
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