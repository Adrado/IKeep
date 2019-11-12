import React, {Fragment, useContext, useState} from 'react';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../components/useForm'
//import PropTypes from 'prop-types';
import GenericElement from '../../models/GenericElement';
import useGenericElementViewModel from './useGenericElementViewModel';
import {Functions} from '../../providers/Providers'

//import FormHelperText from '@material-ui/core/FormHelperText';

import CircularProgress from '@material-ui/core/CircularProgress';


const GenericElementState = 
{
  Ref: "", 
  Name: "", 
  ElementTypeId: "", 
}

const GenericElementForm = ({onModify, selectorData}) => 
{
  const {state, dispatch} = useContext(Functions)

  const SelectRow = () =>
  {
    dispatch({ type: 'SELECT_ROW', data: new GenericElement()});
  }

  const classes = useStyles();
  const [Add, Save, Delete] = useGenericElementViewModel(onModify, SelectRow);
  const {values, handleOnChange, onAdd, onSave, onDelete, handleSelectorChange, renderOptions, selected} = useForm(GenericElementState, state.selectedRow, Add, Save, Delete, selectorData, state.selectedRow.ElementTypeId);

    return(
        <Fragment>
            <Grid container className={classes.container} spacing={1}>  
              <Grid item xs={12}>
                  <h3>{values.Name}</h3>
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
                        className="width50" value={selected} onChange={handleSelectorChange}>
                        {renderOptions()}
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
        </Fragment>
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
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

