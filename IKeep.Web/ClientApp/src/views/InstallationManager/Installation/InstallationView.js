import React from 'react';
import useFetchInstallation from './useFetchInstallation'
import InstallationForm from './InstallationForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const InstallationView = ({treeNode}) =>
{
    const classes = useStyles();
    const {fetchedInstallation, error} = useFetchInstallation(treeNode);
    
    if(fetchedInstallation === null)
    {
        return(
            <CircularProgress className={classes.progress}/>
          )
    }

    if(error === true)
    {return(
      <h1>Error...</h1>
    )}

    if(fetchedInstallation !== null)
    {
        return(
            <InstallationForm
                installationData = {fetchedInstallation}/>
        )
    }
}

export default InstallationView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));