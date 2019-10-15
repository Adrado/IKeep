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
            <Grid container className={classes.container} spacing={1}>  

                <Grid item xs={12}>
                    <h3>Instalación</h3>
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
                        id="CIF" type="text" onChange = {onChange} value = {State.CIF}
                        label="CIF"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="CP" type="number" onChange = {onChange} value = {State.CP}
                        label="CP"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Address" type="text" onChange = {onChange} value = {State.Address}
                        label="Dirección"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="City" type="text" onChange = {onChange} value = {State.City}
                        label="Ciudad"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Phone" type="number" onChange = {onChange} value = {State.Phone}
                        label="Teléfono"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Phone2" type="number" onChange = {onChange} value = {State.Phone2}
                        label="Teléfono secundario"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Fax" type="text" onChange = {onChange} value = {State.Fax}
                        label="Fax"
                        margin="normal"
                        variant="filled"/>
                    </Grid>

                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Email" type="email" onChange = {onChange} value = {State.Email}
                        label="Correo electrónico"
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