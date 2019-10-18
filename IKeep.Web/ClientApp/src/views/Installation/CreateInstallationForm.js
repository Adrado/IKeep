import React from 'react';

import { TextField, Button, Grid  } from '@material-ui/core' 

import { makeStyles } from '@material-ui/core/styles';

import useInstallationViewModel from './InstallationViewModel'

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

const CreateInstallationForm = () =>
{
    const classes = useStyles();
    const {AddNewInstallation, SaveInstallationChanges, DesactiveInstallation, HandleInputChange, Form} = useInstallationViewModel();
    
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  

                <Grid item xs={12}>
                    <h3>Instalación</h3>
                </Grid>
                   
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Ref" type="text" onChange = {HandleInputChange} value = {Form.Ref}
                        label="Ref"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Name" type="text" onChange = {HandleInputChange} value = {Form.Name}
                        label="Nombre"
                        margin="normal"
                        variant="filled"
                        required/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="CIF" type="text" onChange = {HandleInputChange} value = {Form.CIF}
                        label="CIF"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="CP" type="number" onChange = {HandleInputChange} value = {Form.CP}
                        label="CP"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Address" type="text" onChange = {HandleInputChange} value = {Form.Address}
                        label="Dirección"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="City" type="text" onChange = {HandleInputChange} value = {Form.City}
                        label="Ciudad"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Phone" type="number" onChange = {HandleInputChange} value = {Form.Phone}
                        label="Teléfono"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Phone2" type="number" onChange = {HandleInputChange} value = {Form.Phone2}
                        label="Teléfono secundario"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Fax" type="text" onChange = {HandleInputChange} value = {Form.Fax}
                        label="Fax"
                        margin="normal"
                        variant="filled"/>
                    </Grid>

                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Email" type="email" onChange = {HandleInputChange} value = {Form.Email}
                        label="Correo electrónico"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}></Grid>
                    <Grid item xs={6} sm = {4}></Grid>

                    <Grid item xs={2}>
                        <Button className={classes.button} size="small" onClick = {AddNewInstallation} variant="outlined">Añadir</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.button} size="small" onClick = {SaveInstallationChanges} variant="outlined">Guardar</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className={classes.button} size="small" onClick = {DesactiveInstallation} variant="outlined">Borrar</Button>
                    </Grid>
                
            </Grid>
        </React.Fragment>
    )
}

export default CreateInstallationForm;