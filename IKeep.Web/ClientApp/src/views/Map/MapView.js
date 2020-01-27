import React, {useState, useReducer, Fragment} from 'react';
import {
    Button, 
    Grid, 
    TextField, 
    MenuItem, 
    MenuList } from '@material-ui/core';

import useForm from '../../components/useForm'
import PropTypes from 'prop-types';
import Map from '../../models/Map';
import useMapViewModel from './useMapViewModel';

import useFetchInstallations from '../GenerateChores/useFetchInstallations';

import useStyles from '../../components/useStyles';
import InstallationSelect from './InstallationSelect';
import { MapContext } from '../../providers/Providers';
import BuildingSelect from './BuildingSelect';
import FloorSelect from './FloorSelect';


function reducer(state, action) {
    switch (action.type) {
        case 'SELECT_INSTALLATION':
            return {
                installation: action.data,
                building: state.building,
                floor: state.floor
            };
        case 'SELECT_BUILDING':
            return{
                installation: state.installation,
                building: action.data,
                floor: state.floor
            };
        case 'SELECT_FLOOR':
            return{
                installation: state.installation,
                building: state.building,
                floor: action.data
            };
        default:
            return initialState;
    }
}

const initialState = {
    installation: null,
    building: null,
    floor: null,
  };

const MapState = 
    {
        Name: "",
        Description: "",
        ImageId: "",
        FloorId: "",
        AreaRef: "",
    }

const MapView = () => 
{

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const [Add, Save, Delete] = useMapViewModel();

    const {values, handleOnChange, onAdd, onSave, onDelete} = useForm(MapState, MapData, Add, Save, Delete);
        
    const { Name, Description} = values;

    const classes = useStyles();
    
    return(
        <Fragment>
            <Grid container className={classes.container} spacing={1}>  

            <MapContext.Provider value={{ state, dispatch }}>
                <Grid item xs={12}>
                    <InstallationSelect/>

                    { state.installation !== null &&
                        <BuildingSelect/>
                    }

                    { state.building !== null &&
                        <FloorSelect/>
                    }
                    
                </Grid>
            </MapContext.Provider>

                    <Grid item xs={6} sm = {3}>
                        <TextField
                        name="MapName" type="text" onChange = {handleOnChange} value = {Name}
                        label="Nombre del plano"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {3}>
                        <TextField
                        name="Description" type="text" onChange = {handleOnChange} value = {Description}
                        label="Descripción"
                        margin="normal"
                        variant="filled"
                        required/>
                    </Grid>

                    <Grid item xs={12}>
                        { MapData.Id === "00000000-0000-0000-0000-000000000000" &&
                        <Grid item xs={6} sm = {3}>
                            <Button className={classes.button} size="small" onClick = {onAdd} variant="outlined">Añadir</Button>
                        </Grid>}

                        { MapData.Id !== "00000000-0000-0000-0000-000000000000" &&
                        <Grid item xs={6} sm = {3}>
                            <Button className={classes.button} size="small" onClick = {onSave} variant="outlined">Guardar</Button>
                        </Grid>}

                        { MapData.Id !== "00000000-0000-0000-0000-000000000000" &&
                        <Grid item xs={6} sm = {3}>
                            <Button className={classes.button} size="small" onClick = {onDelete} variant="outlined">Borrar</Button>
                        </Grid>}
                    </Grid>
                    
                
            </Grid>
        </Fragment>
    )
}

export default MapView;

MapView.propTypes = {
MapData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Ref: PropTypes.string.isRequired,
}).isRequired,
};