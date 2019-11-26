import React, {Fragment, useReducer} from 'react';
import {Functions} from '../../providers/Providers';
import Format from '../../models/Format';
import FormatsTable from './FormatsTable';

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
  selectedRow: new Format(),
};

const FormatView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <FormatsTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default FormatView;

