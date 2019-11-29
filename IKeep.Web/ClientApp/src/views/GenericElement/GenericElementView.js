import React, {Fragment, useReducer, useState} from 'react';

//Material-ui components
import {Grid} from '@material-ui/core' 

//Contexts
import {Functions} from '../../providers/Providers'

//Models
import GenericElement from '../../models/GenericElement';

//Tables view
import GenericTasksTable from './GTask/GenericTasksTable';
import GenericElementsTable from './GenericElementsTable';
import GElementGTasksTable from './GElementGTask/GElementGTasksTable';

//Allows comunicate between tables
function reducer(state, action) {
  switch (action.type) {
      case 'SELECT_ROW':
          return {
            selectedRow: action.data,
            tasks: state.tasks,
            change: state.change
          };
      case 'ADD_TASKS':
          return{
            selectedRow: state.selectedRow,
            tasks: action.data,
            change: state.change
          };
      case 'TASKS_ADDED':
          return{
            selectedRow: state.selectedRow,
            tasks: state.tasks,
            change: action.data
          };
      default:
          return initialState;
  }
}

const initialState = {
  selectedRow: new GenericElement(),
  tasks: [],
  change: false
};

const GenericElementView = () =>
{
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
