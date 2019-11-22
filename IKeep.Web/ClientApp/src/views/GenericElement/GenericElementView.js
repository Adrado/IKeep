import React, {Fragment, useReducer, useState} from 'react';

//Material-ui components
import {Grid, CircularProgress, makeStyles} from '@material-ui/core' 

//Contexts
import {Functions} from '../../providers/Providers'

//Models
import GenericElement from '../../models/GenericElement';

//Hooks CRUD Data
import useFetchElementType from '../../views/ElementType/useFetchElementType';

//Tables view
import GenericTasksTable from './GTask/GenericTasksTable';
import GenericElementsTable from './GenericElementsTable';
import GElementGTasksTable from './GElementGTask/GElementGTasksTable';

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

    const [state, dispatch] = useReducer(reducer, initialState);

    const [display, setDisplay] = useState(true);
    const DisplayTable = () =>
    {
      setDisplay(!display);
    }

    return(
      <Fragment>
        <Grid container spacing={4}>
          <Functions.Provider value={{ state, dispatch }}>

          {display &&
            <Grid item sm={6} xs={12}>
                <GenericElementsTable/>  
            </Grid>
          }

          <Grid item sm={6} xs={12}>
            <GElementGTasksTable
              displayTable = {DisplayTable}
            />
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