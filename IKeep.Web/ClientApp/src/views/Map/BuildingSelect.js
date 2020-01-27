import React, {useState, useContext, Fragment} from 'react';
import {
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, } from '@material-ui/core';

import useFetchBuildings from './useFetchBuildings';
import {MapContext} from '../../providers/Providers';
import useStyles from '../../components/useStyles';

const BuildingSelect = () =>
{
    const [buildingSelected, setBuildingSelected] = useState('');
    const {state, dispatch} = useContext(MapContext);

    const {Buildings} = useFetchBuildings(state.installation.Id);

    if(Buildings !== null)
    {
        var BuildingItems = Buildings.map((building) =>
        <MenuItem key={building.Id} value = {building}>
          {building.Name}
        </MenuItem>
      );
    }

    const handleBuildingChange = event => 
    {
        setBuildingSelected(event.target.value);
        dispatch({ type: 'SELECT_BUILDING', data: event.target.value,});
        console.log(buildingSelected.Id);
        console.log(state);
    };

    const classes = useStyles();

    return(
        <Fragment>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="Buildings">Edificio</InputLabel>
                <Select
                    labelId="Building"
                    id="demo-simple-select-filled"
                    value={buildingSelected}
                    onChange={handleBuildingChange}
                >
                    {BuildingItems}
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default BuildingSelect;