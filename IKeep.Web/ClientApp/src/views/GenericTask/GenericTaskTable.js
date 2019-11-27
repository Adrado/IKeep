import React, {Fragment, useContext, useState} from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core' 

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../components/MaterialTableProps'

//Contexts
import {Functions} from '../../providers/Providers';

//CRUD Services
import useFetchGenericTask from './useFetchGenericTask';
import useGenericTaskViewModel from './useGenericTaskViewModel';
import useFetchFormat from '../Format/useFetchFormat';
import useFetchCategory from '../Category/useFetchCategory';
import useFetchPriority from '../Priority/useFetchPriority';


const GenericTasksTable = () => 
{
  const classes = useStyles();
  const {state, dispatch} = useContext(Functions);

  const Select = (e, rowData) =>
  {
    dispatch({ type: 'SELECT_ROW', data: rowData,});
  }

  const {Categories} = useFetchCategory();
  const {Formats} = useFetchFormat();
  const {Priorities} = useFetchPriority();

  const {GTasks, change, setChange} = useFetchGenericTask();
  const [Add, Save, Delete] = useGenericTaskViewModel();
  const [row, setRow] = useState(state.selectedRow);
   
  const BuildField = (Data) =>
  {
    let lookup = {}
    for (let i in Data)
    {
      let data = Data[i];
      lookup[data.Id] = data.Name;
    }
    return lookup;
  }

  //Info to GenericTasks Table 
  const LookupFormats = BuildField(Formats);
  const LookupCategories = BuildField(Categories);
  const LookupPriorities = BuildField(Priorities);

  const Periodicity = Object.freeze({
    0 : "Diaria",
    1 : "Semanal",
    2 : "Mensual",
    3 : "Bimensual",
    4 : "Trimestral",
    5 : "Semestral",
    6 : "Anual",
    7 : "Bianual",
    8 : "Cuatrianual"
  })

  const columns = [
    { title: 'Descripción', field: 'Description' },
    { title: 'Periodicidad', field: 'Period', lookup: Periodicity},
    //Vigilar el formato para evitar errores en el servidor.
    { title: 'Duración estimada', field: 'Duration'},
    { title: 'Formato', field: 'FormatId', lookup: LookupFormats},
    { title: 'Prioridad', field: 'PriorityId', lookup: LookupPriorities},
    { title: 'Categoria', field: 'CategoryId', lookup: LookupCategories}
  ] 

  const Title = "Tareas";
  
    return(
        <Fragment>
          {GTasks === null &&
              <CircularProgress className={classes.progress}/>
          }
          { GTasks !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={GTasks}
              //onRowClick={((evt, selectedRow) => setRow(selectedRow))}

              options={{
                actionsColumnIndex: -1,
                filtering: true,
                toolbar: true,
                pageSize: 10,
                pageSizeOptions: [10, 20],
                rowStyle: rowData => ({
                  backgroundColor: (row.tableData && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
              }}

              onRowClick={((evt, selectedRow) => 
                { 
                Select(evt, selectedRow);
                setRow(selectedRow) 
                }
                )}

              localization={localizationEsp}

              editable={{
                onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                      Add(newData)
                      .then(() => {
                        setChange(!change)
                        resolve()
                        })
                  }),

                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    Save(oldData, newData)
                    .then(() => {
                      setChange(!change)
                      resolve()
                    })
                  }),

                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    Delete(oldData)
                    .then(() => {
                      setChange(!change)
                      resolve()
                    })
                  }),
              }}
          />
          }
        </Fragment>
  )                
}

export default GenericTasksTable;

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));