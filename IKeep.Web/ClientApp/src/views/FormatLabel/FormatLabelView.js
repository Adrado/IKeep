//Core
import React, {Fragment, useReducer} from 'react';
//Context
import {Functions} from '../../providers/Providers';
//Models
import FormatLabel from '../../models/FormatLabel';
//View Components
import FormatLabelsTable from './FormatLabelsTable';

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
  selectedRow: new FormatLabel(),
};

const FormatLabelView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <FormatLabelsTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default FormatLabelView;

