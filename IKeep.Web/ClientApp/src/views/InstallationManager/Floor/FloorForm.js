import React from 'react';
import { TextField, Button, Grid  } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../../components/useForm'
import PropTypes from 'prop-types';
import Floor from '../../../models/Floor';
import useFloorViewModel from './useFloorViewModel';

const FloorForm = ({floorData = Floor}) => 
{
  const FloorState = 
  {
    Ref: "",
    Name: "",
    Description: "",
  }
  const classes = useStyles();
  const [Add, Save, Delete] = useFloorViewModel()
  const {values, handleOnChange, onAdd, onSave, onDelete} = useForm(FloorState, floorData, Add, Save, Delete);
  
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  
              <Grid item xs={12}>
                  <h3>Planta</h3>
              </Grid>
                  
                  <Grid item xs={6} sm = {4}>
                      <TextField
                      name="Ref" type="text" onChange={handleOnChange} value = {values.Ref}
                      label="Ref"
                      margin="normal"
                      variant="filled"/>
                  </Grid>
                  <Grid item xs={6} sm = {4}>
                      <TextField
                      name="Name" type="text" onChange={handleOnChange} value = {values.Name}
                      label="Nombre"
                      margin="normal"
                      variant="filled"
                      />
                  </Grid>
                  <Grid>
                    {/* <TextField
                        name="Description" type="text" onChange={handleOnChange} value = {values.Description}
                        label="Descripción"
                        margin="normal"
                        variant="filled"
                        /> */}
                  </Grid>
                  
                  { floorData.Id === "00000000-0000-0000-0000-000000000000" &&
                  <Grid item xs={6} sm = {3}>
                      <Button className={classes.button} size="small" onClick={onAdd} variant="outlined" >Añadir</Button>
                  </Grid>
                  }
                
                  { floorData.Id !== "00000000-0000-0000-0000-000000000000" &&
                    <Grid item xs={6} sm = {3}>
                        <Button className={classes.button} size="small" onClick={onSave} variant="outlined" >Guardar</Button>
                    </Grid>
                  }
                  { floorData.Id !== "00000000-0000-0000-0000-000000000000" &&
                    <Grid item xs={6} sm = {3}>
                        <Button className={classes.button} size="small" onClick={onDelete} variant="outlined" >Eliminar</Button>
                    </Grid>
                  }
            </Grid>
        </React.Fragment>
    )
}

export default FloorForm;

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

FloorForm.propTypes = {
  floorData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Ref: PropTypes.string.isRequired,
  }).isRequired,
};