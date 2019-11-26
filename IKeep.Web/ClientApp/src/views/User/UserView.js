import React, {Fragment, useReducer} from 'react';
import {Functions} from '../../providers/Providers';
import User from '../../models/User';
import UsersTable from './UsersTable';

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
  selectedRow: new User(),
};

const UserView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <UsersTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default UserView;

