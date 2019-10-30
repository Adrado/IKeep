import React from 'react';
import useFetchTreeData from './useFetchTreeData'
import Tree from './Tree'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


const TreeView = ({selectedNode}) =>
{
  const classes = useStyles();
  const {fetchedData, error} = useFetchTreeData(selectedNode) 
  //console.log(fetchedData);
  
    if(fetchedData === null)
    {
      return(
        <CircularProgress className={classes.progress}/>
      )
    }
    
    if(error === true)
    {return(
      <h1>Error...</h1>
    )}
    
    if(fetchedData !== null)
    {
      return(
        //<h1>{fetchedData.Name}</h1>
        <Tree 
          treeData = {fetchedData}
        />
      );
    }
}

export default TreeView;


const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));