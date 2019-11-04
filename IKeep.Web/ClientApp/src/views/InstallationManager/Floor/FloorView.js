import React from 'react';
import useFetchFloor from './useFetchFloor'
import FloorForm from './FloorForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const FloorView = ({treeNode}) =>
{
    const classes = useStyles();
    const {fetchedFloor, error} = useFetchFloor(treeNode);
    
    if(fetchedFloor === null)
    {
        return(
            <CircularProgress className={classes.progress}/>
          )
    }

    if(error === true)
    {return(
      <h1>Error...</h1>
    )}

    if(fetchedFloor !== null)
    {
        return(
            <FloorForm
                floorData = {fetchedFloor}/>
        )
    }
}

export default FloorView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));