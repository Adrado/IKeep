//Core
import React, {Fragment, useReducer} from 'react';
//Context
import {Functions} from '../../providers/Providers';
//Models
import Format from '../../models/Format';
//View Components
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

