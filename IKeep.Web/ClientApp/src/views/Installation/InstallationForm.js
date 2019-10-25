import React from 'react';

import { TextField, Button, Grid  } from '@material-ui/core' 

import { makeStyles } from '@material-ui/core/styles';

import useInstallationViewModel from './InstallationViewModel'
import TreeNode from '../../services/dtos/TreeNode';

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

const InstallationForm = ({model}) =>
{
    console.log(model);
    const classes = useStyles();

    //let id = model.Id; //"d24ab749-87e9-43a9-9c7f-70d7021e5c83";
    
    const {values, handleOnChange, onAdd, onSave, onDelete} = useInstallationViewModel(model);
    
    const { Ref, Name, CIF, CP, Address, City, Phone, Phone2, Fax, Email} = values;

    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  

                <Grid item xs={12}>
                    <h3>Instalación</h3>
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
                        required/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="CIF" type="text" onChange = {handleOnChange} value = {CIF}
                        label="CIF"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="CP" type="number" onChange = {handleOnChange} value = {CP}
                        label="CP"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Address" type="text" onChange = {handleOnChange} value = {Address}
                        label="Dirección"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="City" type="text" onChange = {handleOnChange} value = {City}
                        label="Ciudad"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Phone" type="number" onChange = {handleOnChange} value = {Phone}
                        label="Teléfono"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Phone2" type="number" onChange = {handleOnChange} value = {Phone2}
                        label="Teléfono secundario"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Fax" type="text" onChange = {handleOnChange} value = {Fax}
                        label="Fax"
                        margin="normal"
                        variant="filled"/>
                    </Grid>

                    <Grid item xs={6} sm = {4}>
                        <TextField
                        name="Email" type="email" onChange = {handleOnChange} value = {Email}
                        label="Correo electrónico"
                        margin="normal"
                        variant="filled"/>
                    </Grid>
                    <Grid item xs={6} sm = {4}></Grid>
                    <Grid item xs={6} sm = {4}></Grid>

                    { model.Id === null  &&
                    <Grid item xs={2}>
                        <Button className={classes.button} size="small" onClick = {onAdd} variant="outlined">Añadir</Button>
                    </Grid>}

                    {model.Id !== null  &&
                    <Grid item xs={2}>
                        <Button className={classes.button} size="small" onClick = {onSave} variant="outlined">Guardar</Button>
                    </Grid>}

                    {model.Id !== null  &&
                    <Grid item xs={2}>
                        <Button className={classes.button} size="small" onClick = {onDelete} variant="outlined">Borrar</Button>
                    </Grid>}
                
            </Grid>
        </React.Fragment>
    )
}

export default InstallationForm;