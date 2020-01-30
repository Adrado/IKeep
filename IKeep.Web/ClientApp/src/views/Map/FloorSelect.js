import React, {useState, useContext, Fragment} from 'react';
import {
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, } from '@material-ui/core';
import useFetchFloors from './useFetchFloors';
import {MapContext} from '../../providers/Providers';
import useStyles from '../../components/useStyles';

const FloorSelect = () =>
{
    const [floorSelected, setFloorSelected] = useState('');
    const {state, dispatch} = useContext(MapContext);

    const {Floors} = useFetchFloors(state.building.Id);

    if(Floors !== null)
    {
        var FloorItems = Floors.map((floor) =>
        <MenuItem key={floor.Id} value = {floor}>
          {floor.Name}
        </MenuItem>
      );
    }

    const handleFloorChange = event => 
    {
        setFloorSelected(event.target.value);
        dispatch({ type: 'SELECT_FLOOR', data: event.target.value,});
        console.log(floorSelected.Id);
        console.log(state);
    };

    const classes = useStyles();

    return(
        <Fragment>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="Floors">Planta</InputLabel>
                <Select
                    labelId="Floor"
                    id="demo-simple-select-filled"
                    value={floorSelected}
                    onChange={handleFloorChange}
                >
                    {FloorItems}
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default FloorSelect;