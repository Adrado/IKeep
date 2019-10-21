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

const InstallationForm = () =>
{
    const stateSchema = 
    {
        Ref : {value:'', error: ''},
        Name : {value:'', error: ''},
        CIF : {value:'', error: ''},
        CP : {value:'', error: ''},
        Address : {value:'', error: ''},
        City : {value:'', error: ''},
        Phone : {value:'', error: ''},
        Phone2 : {value:'', error: ''},
        Fax : {value:'', error: ''},
        Email : {value:'', error: ''}
    }

    const stateValidatorSchema =
    {
        Ref : 
            {
                required: false,
                validator: 
                {
                    //func: value => /^[A-Za-z0-9\s]+$/.test(value),
                    func: true,
                    error: 'Invalid Ref format.',
                }
            },
        Name : 
            {
                required: true,
                validator: 
                {
                    func: true,
                    error: 'Invalid Name format.',
                }
            },
        CIF : 
            {
                required: false,
                validator: 
                {
                    func: true,
                    error: 'Invalid CIF format.',
                }
            },
        CP : 
            {
                required: false,
                validator: 
                {
                    func: value => /^[0-9]+$/.test(value),
                    error: 'Invalid CP format.',
                }
            },
        Address : 
            {
                required: false,
                validator: 
                {
                    func: true,
                    error: 'Invalid Address format.',
                }
            },
        City : 
            {
                required: false,
                validator: 
                {
                    func: true,
                    error: 'Invalid City format.',
                }
            },
        Phone : 
            {
                required: false,
                validator: 
                {
                    func: true,
                    error: 'Invalid Phone format.',
                }
            },
        Phone2 : 
            {
                required: false,
                validator: 
                {
                    func: true,
                    error: 'Invalid Phone2 format.',
                }
            },
        Fax : 
            {
                required: false,
                validator: 
                {
                    func: true,
                    error: 'Invalid Fax format.',
                }
            },
        Email : 
            {
                required: false,
                validator: 
                {
                    func: true,
                    error: 'Invalid Email format.',
                }
            }
    }
    
    const classes = useStyles();
    const {} = useInstallationForm();
    const {AddNewInstallation, SaveInstallationChanges, DesactiveInstallation, HandleInputChange, Form} = useInstallationViewModel(
        stateSchema,
        stateValidatorSchema,

    );
    
    const { Ref, Name, CIF, CP, Address, City, Phone, Phone2, Fax, Email} = Form;

    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  

                <Grid item xs={12}>
                    <h3>Instalación</h3>
                </Grid>
                   
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Ref" type="text" onChange = {HandleInputChange} value = {Ref}
                        label="Ref"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Name" type="text" onChange = {HandleInputChange} value = {Name}
                        label="Nombre"
                        margin="normal"
                        variant="filled"
                        required/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="CIF" type="text" onChange = {HandleInputChange} value = {CIF}
                        label="CIF"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="CP" type="number" onChange = {HandleInputChange} value = {CP}
                        label="CP"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Address" type="text" onChange = {HandleInputChange} value = {Address}
                        label="Dirección"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="City" type="text" onChange = {HandleInputChange} value = {City}
                        label="Ciudad"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Phone" type="number" onChange = {HandleInputChange} value = {Phone}
                        label="Teléfono"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Phone2" type="number" onChange = {HandleInputChange} value = {Phone2}
                        label="Teléfono secundario"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Fax" type="text" onChange = {HandleInputChange} value = {Fax}
                        label="Fax"
                        margin="normal"
                        variant="filled"/>
                    </Grid>

                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Email" type="email" onChange = {HandleInputChange} value = {Email}
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

export default InstallationForm;