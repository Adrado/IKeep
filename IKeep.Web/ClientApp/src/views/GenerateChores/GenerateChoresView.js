//Core
import React, {Fragment, useState} from 'react';

//CRUD Services
import useFetchChores from './useFetchChore';

import MaterialTable from 'material-table';
import { Button, Grid, TextField, FormControl, makeStyles, InputLabel, Select, MenuItem, MenuList } from '@material-ui/core';
import useChoreViewModel from './useChoreViewModel';
import useFetchInstallations from './useFetchInstallations';
import CurrentChoreResponse from './CurrenChoreReport';
import usePartialReport from './usePartialReport';
import PartialReportResponse from '../../services/dtos/PartialReportResponse';

const GenerateChoresView = () =>
{

    const {Installations} = useFetchInstallations();

    const [selected, setSelected] = useState('');
    const [year, setYear] = useState('');
    const [current, setCurrent] = useState(null);
    const [lastYear, setLastYear] = useState(null);

    const [AddNewChores] = useChoreViewModel();
    const [GetReport] = usePartialReport();
    const classes = useStyles();


     const columns = [
      { title: 'Fecha Inicio', field: 'startDate' },
      { title: 'Fecha Fin', field: 'endDate' },
      { title: 'Id Element', field: 'elementId' },
      { title: 'Id TareaGenérica', field: 'genericChoreId' },
    ]  

    const onGetReport = () =>
    {
      GetReport(year, selected.Id)
      .then((response) => {
        let reportResponse = new PartialReportResponse(response.data);
        setCurrent(reportResponse.CurrentRequest);
        setLastYear(reportResponse.BeforeYear);
        
        })
    }
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

          {(year !== '' && selected !== '') &&
            <Grid item xs={6} sm = {3}>
                  <Button onClick={onAdd}>Generar Ordenes</Button>
            </Grid>
          }

            <Grid item xs={6} sm = {3}>
                  <Button onClick={onGetReport}>Ver estado</Button>
            </Grid>

          {(current !== null && lastYear !== null) &&
            <h1>Año Seleccionado {current}/{lastYear} Año anterior</h1>
          }
                    
        </Grid>

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

