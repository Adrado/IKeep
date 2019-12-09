//Core
import React, {Fragment} from 'react';

//CRUD services
import useFetchArea from './useFetchArea'

//Views
import AreaForm from './AreaForm';
import ElementsTable from './Element/ElementsTable';

//Style components
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

//Validation
import PropTypes from 'prop-types';
import TreeNode from '../../../services/dtos/TreeNode'

/**
 * @param {TreeNode} treeNode
 */
const AreaView = ({treeNode}) =>
{
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