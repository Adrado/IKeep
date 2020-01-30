/* import React, { Fragment } from 'react';
import useFetchFloorMaps from './useFetchFloorMaps';
import {Image} from '@material-ui/core';


const FloorMaps = ({floorId}) =>
{
    const {MultimediaDtos} = useFetchFloorMaps(floorId);

    let Images = [];
    if(MultimediaDtos !== null)
    {
        Images = MultimediaDtos.map((dto) =>
        <img src= {dto.Base64} alt="Red dot" />);
    }
    
    var images;
    if(MultimediaDtos !== null)
    {
        images = MultimediaDtos.map(function(dto) {
            return (<img src={dto.Base64} rounded />);
           });
    }
    

    let InstallationItems = Installations.map((installation) =>
        <MenuItem key={installation.Id} value = {installation}>
          {installation.Name}
        </MenuItem>
      );
    return(
        <Fragment>
            {MultimediaDtos !== null &&
                {images}
            }
            
        </Fragment>
        
    )
}

export default FloorMaps; */