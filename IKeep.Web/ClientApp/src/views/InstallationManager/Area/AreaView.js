import React, {Fragment, useState, useReducer} from 'react';
import useFetchArea from './useFetchArea'
import AreaForm from './AreaForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ElementsTable from './Element/ElementsTable';
import AddElementsDialog from './Element/AddElementsDialog';

import {Functions} from '../../../providers/Providers'

function reducer(state, action) {
  switch (action.type) {
      case 'SELECT_ROW':
          return {
            selectedRow: action.data,
            tasks: state.tasks,
            change: state.change
          };
      case 'ADD_TASKS':
          return{
            selectedRow: state.selectedRow,
            tasks: action.data,
            change: state.change
          };
      case 'TASKS_ADDED':
          return{
            selectedRow: state.selectedRow,
            tasks: state.tasks,
            change: action.data
          };
      default:
          return initialState;
  }
}

const initialState = {
  selectedAreaId: null,
};

/**
 * @param {TreeNode} treeNode
 */
const AreaView = ({treeNode}) =>
{
    const [state, dispatch] = useReducer(reducer, initialState);
    const classes = useStyles();
    const {fetchedArea, error} = useFetchArea(treeNode);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return(
      <Fragment>
        <Functions.Provider value={{ state, dispatch }}>
          {fetchedArea === null &&
            <CircularProgress className={classes.progress}/>
          }
          {error === true &&
            <h1>Error...</h1>
          }
          {fetchedArea !== null &&
            <AreaForm
              areaData = {fetchedArea}
              />
          }
          {fetchedArea !== null &&
            <ElementsTable
              areaId = {fetchedArea.Id}
              handleClickOpen = {handleClickOpen}
            />
          }
          {fetchedArea !== null &&
            <AddElementsDialog
              open = {open}
              handleClose = {handleClose}
              areaId = {fetchedArea.Id}
            />
          }
        </Functions.Provider>
      </Fragment>
    )    
}

export default AreaView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));