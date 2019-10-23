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

function FloorForm(){

    const id = "de579db4-6927-479c-824a-a3fb20031f39";
    const classes = useStyles();

    const {stateSchema, stateValidatorSchema, onAdd, onSave, onDelete} = useFloorViewModel(id);
    
   /*  const {values, errors, handleOnChange, handleOnAdd, handleOnSave, handleOnDelete, disable } = useForm(stateSchema, stateValidatorSchema, onAdd, onSave, onDelete, id); */
    let SS = stateSchema;
    let SV = stateValidatorSchema;
    let OA = onAdd;
    let OS = onSave;
    let OD = onDelete;
    /* const {SS, SV, OA, OS, OD} = useFloorViewModel(id); */
    const {values, errors, handleOnChange, handleOnAdd, handleOnSave, handleOnDelete, disable } = useForm(SS, SV, OA, OS, OD, id);

    const {Ref, Name} = values
    
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  
              <Grid item xs={12}>
                  <h3>Planta</h3>
              </Grid>
                  
                  <Grid item xs={6} sm = {4}>
                      <TextField
                      name="Ref" type="text" onChange = {handleOnChange} value = {Ref}
                      label="Ref"
                      margin="normal"
                      variant="filled"/>
                  </Grid>
                  <Grid item xs={6} sm = {4}>
                      <TextField
                      name="Name" type="text" onChange = {handleOnChange} value = {Name}
                      label="Nombre"
                      margin="normal"
                      variant="filled"
                      />
                  </Grid>

                  <Grid item xs={6} sm = {4}/>
                  
                  { id === undefined &&
                  <Grid item xs={3}>
                      <Button className={classes.button} size="small" onClick = {handleOnAdd} variant="outlined" disabled={disable}>Añadir</Button>
                  </Grid>
                  }
                
                  { id !== 1 &&
                    <Grid item xs={3}>
                        <Button className={classes.button} size="small" onClick = {handleOnSave} variant="outlined" >Guardar</Button>
                    </Grid>
                  }
                  { id !== 1 &&
                    <Grid item xs={3}>
                        <Button className={classes.button} size="small" onClick = {handleOnDelete} variant="outlined" >Eliminar</Button>
                    </Grid>
                  }
                  
            </Grid>
        </React.Fragment>
    )
}

export default FloorForm;