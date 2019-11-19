import React, {Fragment, useContext, useState} from 'react';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core' 
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

import GenericElementGenericTask from '../../../models/GenericElementGenericTask';
import {Functions} from '../../../providers/Providers';

//Components
import DataTable from '../../../components/DataTable';
import useForm from '../../../components/useForm';

import useFetchGenericTask from '../../GenericTask/useFetchGenericTask'
import useGElementGTaskViewModel from './useGElementGTaskViewModel';

const GElementGTaskState = 
{
  Status : "",
  GenericTaskDescription : ""
}

const GElementGTaskForm = ({onModify, selectorData}) => 
{
  const {state, dispatch} = useContext(Functions)
  console.log(state);

  const SelectRow = () =>
  {
    dispatch({ type: 'SELECT_ROW', data: new GenericElementGenericTask()});
  }

  const {fetchedGenericTask} = useFetchGenericTask();

  const classes = useStyles();
  const [Add, Save, Delete] = useGElementGTaskViewModel(onModify, SelectRow);
  const {values, handleOnChange, onAdd, onSave, onDelete, handleSelectorChange} = useForm(
    GElementGTaskState, 
    state.selectedRow, 
    Add, 
    Save, 
    Delete, 
  );

  const Periodicity = Object.freeze({
    0 : "Diaria",
    1 : "Semanal",
    2 : "Mensual",
    3 : "Bimensual",
    4 : "Cuatrimestral",
    5 : "Semestral",
    6 : "Anual",
    7 : "Bianual",
    8 : "Cuatrianual"
  })

  const columns = [
      { title: 'Tarea', field: 'Description'},
      { title: 'Periodicidad', field: 'Period', lookup: Periodicity},
      { title: 'Formato', field: 'FormatName'},
      { title: 'Prioridad', field: 'PriorityName'},
      { title: 'Categoria', field: 'CategoryName'}

  ]
  const Title = "Tareas";

    return(
        <Fragment>
            <Grid container className={classes.container} spacing={1}>  
                  </Grid>
                    { fetchedGenericTask !== null &&
                      <MaterialTable
                      title = {Title}
                      columns={columns}
                      data={fetchedGenericTask}

                      actions={[
                        {
                          icon: 'add',
                          tooltip: 'Añadir Tareas',
                          onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                        }
                      ]}

                      options={{
                        actionsColumnIndex: -1,
                        filtering: true,
                        toolbar: true,
                        pageSize: 10,
                        pageSizeOptions: [10, 20],
                        selection: true,
                        search: true
                      }}

                      localization={{
                        header: {
                          actions: ' '
                        },
                        body: {
                          emptyDataSourceMessage: 'No se han encontrado coincidencias',
                          filterRow:{
                            filterTooltip: 'Filtrar'
                          }
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
                    />
                    }
        </Fragment>
  )                
}

export default GElementGTaskForm;

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