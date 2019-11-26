import React, {Fragment} from 'react';
import useFetchArea from './useFetchArea'
import AreaForm from './AreaForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ElementsTable from './Element/ElementsTable';


/**
 * 
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
            areaData = {fetchedArea}/>
        }
        <ElementsTable/>
      </Fragment>
    )    
}

export default AreaView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));