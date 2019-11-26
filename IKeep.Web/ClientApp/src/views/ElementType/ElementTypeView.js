import React, {Fragment, useReducer} from 'react';
import {Functions} from '../../providers/Providers';
import ElementType from '../../models/ElementType';
import ElementTypesTable from './ElementTypesTable';

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
  selectedRow: new ElementType(),
};

const ElementTypeView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <ElementTypesTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default ElementTypeView;

