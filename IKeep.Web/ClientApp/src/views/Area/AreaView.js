import React from 'react';
import useFetchArea from './useFetchArea'
import AreaForm from './AreaForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const AreaView = ({treeNode}) =>
{
    const classes = useStyles();
    const {fetchedArea, error} = useFetchArea(treeNode);
    

    if(fetchedArea === null)
    {
        return(
            <CircularProgress className={classes.progress}/>
          )
    }

    if(error === true)
    {return(
      <h1>Error...</h1>
    )}

    if(fetchedArea !== null)
    {
        return(
            <AreaForm
                areaData = {fetchedArea}/>
        )
    }
}

export default AreaView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));