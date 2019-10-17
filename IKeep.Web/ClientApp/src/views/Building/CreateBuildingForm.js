import React from 'react';

import { TextField, Button, Grid  } from '@material-ui/core' 

import { makeStyles } from '@material-ui/core/styles';

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

let CreateBuildingForm = props =>
{
    const classes = useStyles();
    let {onClickSave, onClickDelete, onClickAdd, onChange, State} = props;
    
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  

                <Grid item xs={12}>
                    <h3>Edificio</h3>
                </Grid>
                   
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Ref" type="text" onChange = {onChange} value = {State.Ref}
                        label="Ref"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Name" type="text" onChange = {onChange} value = {State.Name}
                        label="Nombre"
                        margin="normal"
                        variant="filled"
                        required/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Description" type="text" onChange = {onChange} value = {State.Description}
                        label="Description"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    
                    <Grid item xs={2}>
                        <Button className={classes.button} size="small" onClick = {onClickAdd} variant="outlined">Añadir</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.button} size="small" onClick = {onClickSave} variant="outlined">Guardar</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.button} size="small" onClick = {onClickDelete} variant="outlined">Borrar</Button>
                    </Grid>
                
            </Grid>
        </React.Fragment>
    )
}

export default CreateBuildingForm; 