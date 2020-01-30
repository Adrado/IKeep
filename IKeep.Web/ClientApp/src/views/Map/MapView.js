import React, {useState, useReducer, Fragment} from 'react';
import {
    Button, 
    Grid, 
    TextField, 
    MenuItem, 
    MenuList,
    Input,
    FormControl } from '@material-ui/core';

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
import FloorMaps from './FloorMaps';


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

const MapData = new Map();

const MapView = () => 
{

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const [Add, Save, Delete] = useMapViewModel();

    const {values, handleOnChange} = useForm(MapState, MapData,);
        
    const { Name, Description} = values;
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    
    const onAdd = () =>
    {
        Add(values, state.floor.Id, imagePreviewUrl)
        .then((response) => {
            console.log(response);
            })
    }

    const fileChangedHandler = (event) =>
    {
        setSelectedFile(event.target.files[0])
        let reader = new FileReader();
        reader.onloadend = () => 
        {
            setImagePreviewUrl(reader.result)
        }
    
        reader.readAsDataURL(event.target.files[0])
    }

    const classes = useStyles();

    let $imagePreview = (<div className="image-container" ><img src={imagePreviewUrl} alt="icon" width="300" /> </div>);
    
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
                        name="Name" type="text" onChange = {handleOnChange} value = {Name}
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

                    <FormControl className={classes.margin} variant="filled">
                        <Input type="file" name="Map" onChange={fileChangedHandler} accept="image/*" />
                    </FormControl>

                    {imagePreviewUrl !== null &&
                        $imagePreview /*  */
                    }

                        { MapData.Id === "00000000-0000-0000-0000-000000000000" &&
                        <Grid item xs={6} sm = {3}>
                            <Button className={classes.button} size="small" onClick = {onAdd} variant="outlined">Añadir</Button>
                        </Grid>}
                    {/* <Grid item xs={12}>
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
                    </Grid> */}


                    {/* {state.floor !== null &&
                        <FloorMaps
                            floorId = {state.floor.Id}
                        />
                    } */}
                    
                    
                
            </Grid>
        </Fragment>
    )
}

export default MapView;

/* MapView.propTypes = {
MapData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Ref: PropTypes.string.isRequired,
}).isRequired,
}; */