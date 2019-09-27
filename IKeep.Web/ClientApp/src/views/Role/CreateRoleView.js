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

let CreateRoleView = props =>
{
    const classes = useStyles();
    let {onClick, onChange, State} = props;
    
    return(
        <React.Fragment>
            <form className={classes.container}>  
                <Grid item xs={12}>
                    <h2>Crear Rol</h2>
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
            </form>
        </React.Fragment>
    )
}

export default CreateRoleView;