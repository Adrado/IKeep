import React from 'react';
import { TextField, Button, Grid  } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../../components/useForm'
import PropTypes from 'prop-types';
import Building from '../../../models/Building';
import useBuildingViewModel from './useBuildingViewModel';

const BuildingForm = ({buildingData = Building}) => 
{
  const BuildingState = 
  {
    Ref: "",
    Name: "",
    Description: "",
  }
  const classes = useStyles();
  const [Add, Save, Delete] = useBuildingViewModel()
  const {values, handleOnChange, onAdd, onSave, onDelete} = useForm(BuildingState, buildingData, Add, Save, Delete);
  const{Ref, Name} = values;
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  
              <Grid item xs={12}>
                  <h3>Edificio</h3>
              </Grid>
                  
                  <Grid item xs={6} sm = {4}>
                      <TextField
                      name="Ref" type="text" onChange={handleOnChange} value = {Ref}
                      label="Ref"
                      margin="normal"
                      variant="filled"/>
                  </Grid>
                  <Grid item xs={6} sm = {4}>
                      <TextField
                      name="Name" type="text" onChange={handleOnChange} value = {Name}
                      label="Nombre"
                      margin="normal"
                      variant="filled"
                      />
                  </Grid>

                  <Grid/>
                  
                  { buildingData.Id === "00000000-0000-0000-0000-000000000000" &&
                  <Grid item xs={6} sm = {3}>
                      <Button className={classes.button} size="small" onClick = {onAdd} variant="outlined" >Añadir</Button>
                  </Grid>
                  }
                
                { buildingData.Id !== "00000000-0000-0000-0000-000000000000" &&
                    <Grid item xs={6} sm = {3}>
                        <Button className={classes.button} size="small" onClick = {onSave} variant="outlined" >Guardar</Button>
                    </Grid>
                  }
                  { buildingData.Id !== "00000000-0000-0000-0000-000000000000" &&
                    <Grid item xs={6} sm = {3}>
                        <Button className={classes.button} size="small" onClick = {onDelete} variant="outlined" >Eliminar</Button>
                    </Grid>
                  }
                  
            </Grid>
        </React.Fragment>
    )
}

export default BuildingForm;


BuildingForm.propTypes = {
  buildingData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Ref: PropTypes.string.isRequired,
  }).isRequired,
};

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