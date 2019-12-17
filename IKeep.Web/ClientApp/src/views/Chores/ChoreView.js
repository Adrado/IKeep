//Core
import React, {Fragment} from 'react';

//CRUD Services
import useFetchChores from './useFetchChore';

import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';
import useChoreViewModel from './useChoreViewModel';

const ChoreView = () =>
{
    let id = "f814d347-282e-4251-9a21-1d5c00f336c5"
    const {Chores} = useFetchChores(id);
    const [AddNewChores] = useChoreViewModel();
    const columns = [
      { title: 'Fecha Inicio', field: 'startDate' },
      { title: 'Fecha Fin', field: 'endDate' },
      { title: 'Id Element', field: 'elementId' },
      { title: 'Id TareaGenérica', field: 'genericChoreId' },
    ] 
  return(
    <Fragment>
      <Button onClick={AddNewChores}>A</Button>
      {Chores !== null &&
        <MaterialTable
          title = {"Tareas"}
          columns={columns}
          data={Chores}
          />
      }
      

    </Fragment>
  )
}

export default ChoreView;

