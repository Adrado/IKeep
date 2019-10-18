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
    const {onClickAdd, onClickSave, onClickDelete, onChange, Form} = useInstallationViewModel();
    
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  

                <Grid item xs={12}>
                    <h3>Instalación</h3>
                </Grid>
                   
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Ref" type="text" onChange = {onChange} value = {Form.Ref}
                        label="Ref"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Name" type="text" onChange = {onChange} value = {Form.Name}
                        label="Nombre"
                        margin="normal"
                        variant="filled"
                        required/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="CIF" type="text" onChange = {onChange} value = {Form.CIF}
                        label="CIF"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="CP" type="number" onChange = {onChange} value = {Form.CP}
                        label="CP"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Address" type="text" onChange = {onChange} value = {Form.Address}
                        label="Dirección"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="City" type="text" onChange = {onChange} value = {Form.City}
                        label="Ciudad"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Phone" type="number" onChange = {onChange} value = {Form.Phone}
                        label="Teléfono"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Phone2" type="number" onChange = {onChange} value = {Form.Phone2}
                        label="Teléfono secundario"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Fax" type="text" onChange = {onChange} value = {Form.Fax}
                        label="Fax"
                        margin="normal"
                        variant="filled"/>
                    </Grid>

                    <Grid item xs={6} sm = {4}>
                        <TextField
                        id="Email" type="email" onChange = {onChange} value = {Form.Email}
                        label="Correo electrónico"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}></Grid>
                    <Grid item xs={6} sm = {4}></Grid>

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

export default CreateInstallationForm;