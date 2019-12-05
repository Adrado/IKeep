import React, {Fragment, useState, useReducer} from 'react';

//CRUD services
import useFetchArea from './useFetchArea'

//Views
import AreaForm from './AreaForm';
import ElementsTable from './Element/ElementsTable';

//style components
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

//Validation
import PropTypes from 'prop-types';
import TreeNode from '../../../services/dtos/TreeNode'

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
    //const [state, dispatch] = useReducer(reducer, initialState);
    const classes = useStyles();
    const {fetchedArea, error} = useFetchArea(treeNode);

    return(
      <Fragment>
        
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
            />
          }   

      </Fragment>
    )    
}

export default AreaView;

AreaView.propTypes = {
  treeNode: PropTypes.instanceOf(TreeNode),
};

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));