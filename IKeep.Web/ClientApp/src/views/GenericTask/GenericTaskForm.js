import React, {useContext} from 'react';
import { TextField, Button, Grid  } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../components/useForm'
//import PropTypes from 'prop-types';
import GenericTask from '../../models/GenericTask';
import useGenericTaskViewModel from './useGenericTaskViewModel';
import {Functions} from '../../providers/Providers'

const GenericTaskForm = ({onModify}) => 
{
  const {state, dispatch} = useContext(Functions)

  const Select = () =>
  {
    dispatch({ type: 'SELECT_ROW', data: new GenericTask()});
  }
  
  const GenericTaskState = 
  {
    Ref: "", 
    Description: "",
    Duration: "",
    Period: "",
    PriorityId: "",
    FormatId: "",
    CategoryId: "" 
  }

  const classes = useStyles();
  const [Add, Save, Delete] = useGenericTaskViewModel(onModify, Select)
  const {values, handleOnChange, onAdd, onSave, onDelete} = useForm(GenericTaskState, state.selectedRow, Add, Save, Delete);
  const {Ref, Description, Duration} = values;
    return(
        <React.Fragment>
            <Grid container className={classes.container} spacing={1}>  
              <Grid item xs={12}>
                  <h3>Tareas Genéricas</h3>
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
                      name="Description" type="text" onChange={handleOnChange} value = {Description}
                      label="Descripción"
                      margin="normal"
                      variant="filled"
                      />
                  </Grid>
                  <Grid item xs={6} sm = {4}>
                      <TextField
                      name="Duration" type="text" onChange={handleOnChange} value = {Duration}
                      label="Duración"
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

export default GenericTaskForm;

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

