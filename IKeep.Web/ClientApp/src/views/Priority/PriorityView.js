import React, {Fragment, useReducer} from 'react';
import {Functions} from '../../providers/Providers';
import Priority from '../../models/Priority';
import PrioritiesTable from './PrioritiesTable';

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
  selectedRow: new Priority(),
};

const PriorityView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <PrioritiesTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default PriorityView;

