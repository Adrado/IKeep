import React from 'react';
import useFetchArea from './useFetchArea'
import AreaForm from './AreaForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const AreaView = ({treeNode}) =>
{
    //alert("Renderizando AreaView " + treeNode.Id)
    const classes = useStyles();
    const {fetchedArea, error} = useFetchArea(treeNode);

    
   /*  if(fetchedArea !== null)
      alert("fetchedData " + fetchedArea.Id + "Nombre" + fetchedArea.Name)
    else
      alert("fetchedData " + fetchedArea) */
    

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