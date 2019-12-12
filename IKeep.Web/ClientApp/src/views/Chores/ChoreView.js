//Core
import React, {Fragment} from 'react';

//CRUD Services
import useFetchChores from './useFetchChore';

const ChoreView = () =>
{
    let id = "f814d347-282e-4251-9a21-1d5c00f336c5"
    const {Chores} = useFetchChores(id);
  return(
    <Fragment>
      {Chores !== null &&
        <h1> Correcto </h1>
      }
    </Fragment>
  )
}

export default ChoreView;

