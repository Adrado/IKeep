import React, {Fragment, useContext, useState} from 'react';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../components/useForm'

import GenericElement from '../../models/GenericElement';
import useGenericElementViewModel from './useGenericElementViewModel';
import {Functions} from '../../providers/Providers'


import useFetchGElementGTasks from './GElementGTask/useFetchGElementGTasks';
import DataTable from '../../components/DataTable';
import useFetchGenericTask from '../GenericTask/useFetchGenericTask'

import MaterialTable from 'material-table';
import useGElementGTaskViewModel from './GElementGTask/useGElementGTaskViewModel';


const GenericElementState = 
{
  Ref: "", 
  Name: "", 
  ElementTypeId: "", 
}

const GenericElementForm = ({onModify, selectorData}) => 
{
  const {state, dispatch} = useContext(Functions)
  console.log(state);

  const SelectRow = () =>
  {
    dispatch({ type: 'SELECT_ROW', data: new GenericElement()});
  }

  const classes = useStyles();
  const [Add, Save, Delete] = useGenericElementViewModel(onModify, SelectRow);
  const {values, handleOnChange, onAdd, onSave, onDelete, handleSelectorChange, renderOptions, selected} = useForm(
    GenericElementState, 
    state.selectedRow, 
    Add, 
    Save, 
    Delete, 
    selectorData, 
    state.selectedRow.ElementTypeId);
  const {tasks} = useFetchGElementGTasks(state.selectedRow.Id);
  const [AddGElementGTask, SaveGElementGTask, DeleteGElementGTask] = useGElementGTaskViewModel();

  console.log(tasks);

  const columns = [
      { title: 'Estado', field: 'Status', lookup: { 0: 'Inactivo', 1: 'Activo' }},
      { title: 'Tarea', field: 'GenericTaskDescription', editable: 'never'},
  ]

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
                    {tasks !== null &&
                      <MaterialTable
                        title = {""}
                        columns={columns}
                        data={tasks}

                        actions={[
                          {
                            icon: 'add',
                            tooltip: 'Añadir Tareas',
                            isFreeAction: true,
                            onClick: (event) => alert("You want to add a new row")
                          }
                        ]}

                        options={{
                          actionsColumnIndex: -1,
                          filtering: false,
                          toolbar: true,
                          pageSize: 10,
                          pageSizeOptions: [10, 20],
                          //selection: true,
                        }}

                        localization={{
                          header: {
                            actions: ' '
                          },
                          body: {
                            emptyDataSourceMessage: 'No se han encontrado coincidencias',
                            filterRow:{
                              filterTooltip: 'Filtrar'
                            },
                            editRow:{
                              deleteText: '¿Estás seguro de eliminar esta tarea?',
                              cancelTooltip: 'Cancelar',
                              saveTooltip: 'Guardar'
                            },
                            editTooltip: 'Editar',
                            deleteTooltip: 'Eliminar'
                          },
                          toolbar: {
                            searchTooltip: 'Buscar',
                            searchPlaceholder: 'Buscar'
                          },
                          pagination: {
                            labelRowsSelect: 'Filas',
                            labelDisplayedRows: ' {from}-{to} de {count}',
                            firstTooltip: 'Primera página',
                            previousTooltip: 'Anterior página',
                            nextTooltip: 'Siguiente página',
                            lastTooltip: 'Última página'
                          }
                        }}

                        editable={{
                          onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                {
                                  /* const data = tasks;
                                  const index = tasks.indexOf(oldData);
                                  data[index] = newData; */
                                  SaveGElementGTask(oldData, newData)
                                  //this.setState({ data }, () => resolve());
                                }
                                resolve()
                              }, 1000)
                            }),
                          onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                {
                                  /* let data = this.state.data;
                                  const index = data.indexOf(oldData);
                                  data.splice(index, 1);
                                  this.setState({ data }, () => resolve()); */
                                  DeleteGElementGTask(oldData)
                                }
                                resolve()
                              }, 1000)
                            }),
                        }}
                      />
                    }
            </Grid>
        </Fragment>
    );
}

export default GenericElementForm;

/* <DataTable
    Title = {"gato"}
    Data = {tasks}
    Columns = {columns}
    /> */

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

