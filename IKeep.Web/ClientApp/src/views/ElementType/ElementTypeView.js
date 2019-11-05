import React from 'react';
import useFetchElementType from './useFetchElementType'
import ElementTypeTable from './ElementTypeTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const ElementTypeView = () =>
{
    const classes = useStyles();
    const {fetchedElementType, error} = useFetchElementType();
    
    if(fetchedElementType === null)
    {
        return(
            <CircularProgress className={classes.progress}/>
          )
    }

    if(error === true)
    {return(
      <h1>Error...</h1>
    )}

    if(fetchedElementType !== null)
    {
        return(
            <ElementTypeTable
                elementTypeData = {fetchedElementType}/>
        )
    }
}

export default ElementTypeView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));