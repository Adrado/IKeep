import React from 'react';

import { TextField, Button, Grid  } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';
import useAreaForm from './useAreaForm'
import PropTypes from 'prop-types';
import Area from '../../models/Area';
import useAreaViewModel from './useAreaViewModel';



const AreaForm = ({areaData = Area}) => 
{
  const classes = useStyles();
  const [Add, Save, Delete] = useAreaViewModel()
  const {values, handleOnChange, onAdd, onSave, onDelete} = useAreaForm(areaData, Add, Save, Delete);
  
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  
              <Grid item xs={12}>
                  <h3>Espacio</h3>
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

                  <Grid item xs={6} sm = {4}/>
                  
                  { areaData.Id === "00000000-0000-0000-0000-000000000000" &&
                  <Grid item xs={3}>
                      <Button className={classes.button} size="small" onClick={onAdd} variant="outlined" >Añadir</Button>
                  </Grid>
                  }
                
                  { areaData.Id !== "00000000-0000-0000-0000-000000000000" &&
                    <Grid item xs={3}>
                        <Button className={classes.button} size="small" onClick={onSave} variant="outlined" >Guardar</Button>
                    </Grid>
                  }
                  { areaData.Id !== "00000000-0000-0000-0000-000000000000" &&
                    <Grid item xs={3}>
                        <Button className={classes.button} size="small" onClick={onDelete} variant="outlined" >Eliminar</Button>
                    </Grid>
                  }
                  
            </Grid>
        </React.Fragment>
    )
}

export default AreaForm;

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


AreaForm.propTypes = {
  areaData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Ref: PropTypes.string.isRequired,
  }).isRequired,
};