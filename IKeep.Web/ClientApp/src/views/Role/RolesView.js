import React, {Fragment, useReducer} from 'react';
import {Functions} from '../../providers/Providers';
import Role from '../../models/Role';
import RolesTable from './RolesTable';

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
  selectedRow: new Role(),
};

const RoleView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <RolesTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default RoleView;

