import React, {Fragment, useReducer, useState} from 'react';

//Material-ui components
import {Grid, Collapse, CircularProgress, makeStyles} from '@material-ui/core' 

//Contexts
import {Functions} from '../../providers/Providers'

//Models
import GenericElement from '../../models/GenericElement';

//Forms
import GenericElementForm from './GenericElementForm';

//Components
import DataTable from '../../components/DataTable';

//Hooks CRUD Data
import useFetchElementType from '../../views/ElementType/useFetchElementType';
import useFetchGenericElement from './useFetchGenericElement';

import GenericTasksTable from './GElementGTask/GenericTasksTable';

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

    const [display, setDisplay] = useState(true);

    const DisplayTable = () =>
    {
      setDisplay(!display);
    }

    //Info to GenericElements Table 
    const columns = [
      { title: 'Nombre', field: 'Name' },
      { title: 'Tipo', field: 'ElementTypeName'}
    ] 
    const title = "Elementos Genéricos";

    return(
      <Fragment>
        <Grid container spacing={4}>
          <Functions.Provider value={{ state, dispatch }}>

          {display &&
            <Grid item sm={6} xs={12}>
              { fetchedGenericElement === null &&
                <CircularProgress className={classes.progress}/>
              }
              { error &&
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
          }
            <Grid item sm={6} xs={12}>
              {fetchedElementType === null &&
                <CircularProgress className={classes.progress}/>
              }
              {fetchedElementType !== null &&
                <GenericElementForm
                  onModify = {onModify}
                  selectorData = {fetchedElementType}
                  displayTable = {DisplayTable}
                />
              }
            </Grid>

          {!display &&
            <Grid item sm={6} xs={12}>
                <GenericTasksTable
                  displayTable = {DisplayTable}
                />
            </Grid>
          } 

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