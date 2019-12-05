import React, {Fragment, useReducer} from 'react';
import {Functions} from '../../providers/Providers';
import InstallationUser from '../../models/InstallationUser';
import InstallationUsersTable from './InstallationUsersTable';

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
  selectedRow: new InstallationUser(),
};

const InstallationUserView = () =>
{
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <Fragment>
      <Functions.Provider value={{ state, dispatch }}>
          <InstallationUsersTable/>  
      </Functions.Provider>
    </Fragment>
  )
}

export default InstallationUserView;

