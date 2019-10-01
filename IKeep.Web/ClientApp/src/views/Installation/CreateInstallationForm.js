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

let CreateInstallationForm = props =>
{
    const classes = useStyles();
    let {onClick, onChange, State} = props;
    
    return(
        <React.Fragment>
            <Grid className={classes.container}>  
                <Grid item xs={12}>
                    <h3>Crear Rol</h3>
                </Grid> 
                <Grid item xs={12}>
                    <TextField
                    id="Name" type="text" onChange = {onChange} value = {State.Name}
                    label="Nombre"
                    margin="normal"
                    variant="filled"/>
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.button} size="small" onClick = {onClick} variant="outlined">Añadir</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default CreateInstallationForm;