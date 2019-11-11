import React, {useContext} from 'react';
import { TextField, Button, Grid, Select, InputLabel, FormControl } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../components/useForm'
//import PropTypes from 'prop-types';
import GenericElement from '../../models/GenericElement';
import useGenericElementViewModel from './useGenericElementViewModel';
import {Functions} from '../../providers/Providers'

/* import useFetchElementType from '../../views/ElementType/useFetchElementType' */

/* import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText'; */


const GenericElementForm = ({onModify}) => 
{
  const {state, dispatch} = useContext(Functions)

  const SelectRow = () =>
  {
    dispatch({ type: 'SELECT_ROW', data: new GenericElement()});
  }

/*   const {fetchedElementType} = useFetchElementType(); */
  
  const GenericElementState = 
  {
    Ref: "", 
    Name: "", 
    Description: "", 
  }
  const classes = useStyles();
  const [Add, Save, Delete] = useGenericElementViewModel(onModify, SelectRow)
  const {values, handleOnChange, onAdd, onSave, onDelete} = useForm(GenericElementState, state.selectedRow, Add, Save, Delete);


    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  
              <Grid item xs={12}>
                  <h3>Elementos Genéricos</h3>
              </Grid>
                  
                  <Grid item xs={6} sm = {4}>
                      <TextField
                      name="Name" type="text" onChange={handleOnChange} value = {values.Name}
                      label="Nombre"
                      margin="normal"
                      variant="filled"
                      />
                  </Grid>

                  <FormControl variant="filled" className={classes.formControl} xs={6} sm = {4}>
                    <InputLabel id="demo-simple-select-label">Tipo de Elemento</InputLabel>
                    <Select
                      value={fetchedElementType}>

                    </Select>
                  </FormControl>
                
                  <Grid container>
                  
                    { state.selectedRow.Id === "00000000-0000-0000-0000-000000000000" &&
                    <Grid item xs={6} sm = {3}>
                        <Button className={classes.button} size="small" onClick={onAdd} variant="outlined" >Añadir</Button>
                    </Grid>
                    }
                  
                    { state.selectedRow.Id !== "00000000-0000-0000-0000-000000000000" &&
                      <Grid item xs={6} sm = {3}>
                          <Button className={classes.button} size="small" onClick={onSave} variant="outlined" >Guardar</Button>
                      </Grid>
                    }
                    { state.selectedRow.Id !== "00000000-0000-0000-0000-000000000000" &&
                      <Grid item xs={6} sm = {3}>
                          <Button className={classes.button} size="small" onClick={onDelete} variant="outlined" >Eliminar</Button>
                      </Grid>
                    }
                  </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default GenericElementForm;

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  }
}));

