import React, {Fragment, useReducer} from 'react';
import {Functions} from '../../providers/Providers'
import GenericTask from '../../models/GenericTask';
import GenericTasksTable from './GenericTaskTable';

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

const GenericTaskView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <GenericTasksTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default GenericTaskView;

