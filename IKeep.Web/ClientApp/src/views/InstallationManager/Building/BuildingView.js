import React from 'react';
import useFetchBuilding from './useFetchBuilding'
import BuildingForm from './BuildingForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const BuildingView = ({treeNode}) =>
{
    const classes = useStyles();
    const {fetchedBuilding, error} = useFetchBuilding(treeNode);
    
    if(fetchedBuilding === null)
    {
        return(
            <CircularProgress className={classes.progress}/>
          )
    }

    if(error === true)
    {return(
      <h1>Error...</h1>
    )}

    if(fetchedBuilding !== null)
    {
        return(
            <BuildingForm
                buildingData = {fetchedBuilding}/>
        )
    }
}

export default BuildingView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));