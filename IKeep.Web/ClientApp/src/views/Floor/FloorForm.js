import React from 'react';

import { TextField, Button, Grid  } from '@material-ui/core' 

import { makeStyles } from '@material-ui/core/styles';

import useForm  from '../../components/useForm';
import useFloorViewModel from './useFloorViewModel'

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing(1),
      },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));

const FloorForm = (id) => {

    const classes = useStyles();

    const {stateSchema, stateValidatorSchema, onAdd, onSave, onDelete} = useFloorViewModel(id);

    const {values, errors, handleOnChange, handleOnSubmit, disable } = useForm(
        stateSchema,
        stateValidatorSchema,
        onAdd,
        onSave,
        onDelete
    );
    
    const {Ref, Name} = values
    
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  

                <Grid item xs={12}>
                    <h3>Instalación</h3>
                </Grid>
                   
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Ref" type="text" onChange = {onChange} value = {Ref}
                        label="Ref"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Name" type="text" onChange = {onChange} value = {Name}
                        label="Nombre"
                        margin="normal"
                        variant="filled"
                        required/>
                    </Grid>

                    <Grid item xs={12}>
                        <Button className={classes.button} size="small" onClick = {onClick} variant="outlined">Añadir</Button>
                    </Grid>
                
            </Grid>
        </React.Fragment>
    )
}

export default FloorForm;