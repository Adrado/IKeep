//Core
import React, {Fragment, useState} from 'react';

//CRUD Services
import useFetchChores from './useFetchChore';

import MaterialTable from 'material-table';
import { Button, Grid, TextField, FormControl, makeStyles, InputLabel, Select, MenuItem, MenuList } from '@material-ui/core';
import useChoreViewModel from './useChoreViewModel';
import useFetchInstallations from './useFetchInstallations';

const GenerateChoresView = () =>
{
    let id = "f814d347-282e-4251-9a21-1d5c00f336c5"
    const {Installations} = useFetchInstallations();

    const [selected, setSelected] = useState('');
    const [year, setYear] = useState('');

    const {Chores} = useFetchChores(id);
    const [AddNewChores] = useChoreViewModel();
    const classes = useStyles();
     const columns = [
      { title: 'Fecha Inicio', field: 'startDate' },
      { title: 'Fecha Fin', field: 'endDate' },
      { title: 'Id Element', field: 'elementId' },
      { title: 'Id TareaGenérica', field: 'genericChoreId' },
    ]  

    const onAdd = () =>
    {
      alert(selected.Name);
      alert(year);
      AddNewChores(year, selected.Id)
      .then((response) => {
        console.log(response);
        })
    }
    const handleInstallationChange = event => {
      setSelected(event.target.value);
      console.log(selected.Id);
    };
    const handleYearChange = event => {
      setYear(event.target.value);
      console.log(year);
    };

    if(Installations !== null)
    {
      var InstallationItems = Installations.map((installation) =>
      // Only do this if items have no stable IDs
        <MenuItem key={installation.Id} value = {installation}>
          {installation.Name}
        </MenuItem>
      );
    }

    const ActualYear = new Date().getFullYear();
    const Years = [ActualYear+1, ActualYear, ActualYear-1, ActualYear-2, ActualYear-3, ActualYear-4, ActualYear-5]
    var YearItems = Years.map((year, index) =>
    <MenuItem key={index} value = {year}>
      {year}
    </MenuItem>
    );
  return(
    <Fragment>
        <Grid container className={classes.container} spacing={1}> 

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="Installations">Instalación</InputLabel>
          <Select
            labelId="Installation"
            id="demo-simple-select-filled"
            value={selected}
            onChange={handleInstallationChange}
          >
            {InstallationItems}
  
          </Select>
          
        </FormControl>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="Years">Año</InputLabel>
          <Select
            labelId="Year"
            id="demo-simple-select-filled"
            value={year}
            onChange={handleYearChange}
          >
            {YearItems}
  
          </Select>
          
        </FormControl>

            {/* <Grid item xs={6} sm = {4}>
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
            
            <Grid item xs={6} sm = {4}>
              <TextField
                  name="Description" type="text" onChange={handleOnChange} value = {values.Description}
                  label="Descripción"
                  margin="normal"
                  variant="filled"
                  />
            </Grid> */}
          {(year !== '' && selected !== '') &&
            <Grid item xs={6} sm = {3}>
                  <Button onClick={onAdd}>Generar Ordenes</Button>
            </Grid>
          }
                    
        </Grid>


      {Chores === null &&
        <h1>Cargando...</h1>
      }

      {Chores !== null &&
        <MaterialTable
          title = {"Tareas"}
          columns={columns}
          data={Chores}
          />
      }
      

    </Fragment>
  )
}

export default GenerateChoresView;

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
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

