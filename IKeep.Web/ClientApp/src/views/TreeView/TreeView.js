import React from 'react';
import useFetchData from './useFechData'
import Tree from './Tree'

const TreeView = () =>
{
  const {fetchedData, error} = useFetchData() 
  console.log("En treeView " + fetchedData)
    if(fetchedData === null)
    {
      return(
        <h1>Loading...</h1>
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
        <Tree treeData = {fetchedData}/>
      );
    }
}

export default TreeView;


