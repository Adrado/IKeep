import React, {Fragment, useReducer} from 'react';
import {Functions} from '../../providers/Providers';
import ChoreType from '../../models/ChoreType';
import ChoreTypesTable from './ChoreTypesTable';

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
  selectedRow: new ChoreType(),
};

const ChoreTypeView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <ChoreTypesTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default ChoreTypeView;

