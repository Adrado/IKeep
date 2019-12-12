//Core
import React, {Fragment, useReducer} from 'react';

//Context
import {Functions} from '../../providers/Providers'

//Model
import GenericChore from '../../models/GenericChore';

//View Components
import GenericChoresTable from './GenericChoreTable';

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
  selectedRow: new GenericChore(),
};

const GenericChoreView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <GenericChoresTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default GenericChoreView;

