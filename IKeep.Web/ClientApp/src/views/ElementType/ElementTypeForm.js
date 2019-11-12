import React, {useContext} from 'react';
import { TextField, Button, Grid  } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../components/useForm'
//import PropTypes from 'prop-types';
import ElementType from '../../models/ElementType';
import useElementTypeViewModel from './useElementTypeViewModel';
import {Functions} from '../../providers/Providers'

const ElementTypeForm = ({onModify}) => 
{
  const {state, dispatch} = useContext(Functions)

  const Select = () =>
  {
    dispatch({ type: 'SELECT_ROW', data: new ElementType()});
  }
  
  const ElementTypeState = 
  {
    Ref: "", 
    Name: "", 
    Description: "", 
  }
  const classes = useStyles();
  const [Add, Save, Delete] = useElementTypeViewModel(onModify, Select)
  const {values, handleOnChange, onAdd, onSave, onDelete} = useForm(ElementTypeState, state.selectedRow, Add, Save, Delete);
  
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  
              <Grid item xs={12}>
                  <h3>Tipos de Elementos</h3>
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
    )
}

export default ElementTypeForm;

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

