//Core
import React, {Fragment, useContext, useState} from 'react';

//Style Components
import {CircularProgress, makeStyles} from '@material-ui/core' 

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../components/MaterialTableProps'

//Contexts
import {Functions} from '../../providers/Providers';

//CRUD Services
import useFetchGenericChore from './useFetchGenericChore';
import useGenericChoreViewModel from './useGenericChoreViewModel';
import useFetchCategory from '../Category/useFetchCategory';
import useFetchChoreType from '../ChoreType/useFetchChoreType';


import AddFormatLabelsDialog from './AddFormatLabelsDialog/AddFormatLabelsDialog';


const GenericChoresTable = () => 
{
  const classes = useStyles();
  const {state, dispatch} = useContext(Functions);

  const [genericChore, setGenericChore] = useState(null)
  
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Select = (e, rowData) =>
  {
    dispatch({ type: 'SELECT_ROW', data: rowData,});
  }

  const {Categories} = useFetchCategory();
  //const {FormatLabels} = useFetchFormatLabels();
  const {ChoreTypes} = useFetchChoreType();

  const {GChores, change, setChange} = useFetchGenericChore();
  const [Add, Save, Delete] = useGenericChoreViewModel();
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

  //Info to GenericChores Table 
  //const LookupFormats = BuildField(FormatLabels);
  const LookupCategories = BuildField(Categories);
  const LookupChoreTypes = BuildField(ChoreTypes);

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
    { title: 'Periodicidad', field: 'Period', lookup: Periodicity, editable: "onAdd"},
    //Vigilar el formato para evitar errores en el servidor.
    { title: 'Duración estimada', field: 'Duration'},
    //{ title: 'Formato', field: 'FormatLabelId', lookup: LookupFormats},
    { title: 'Prioridad', field: 'ChoreTypeId', lookup: LookupChoreTypes},
    { title: 'Categoria', field: 'CategoryId', lookup: LookupCategories}
  ] 

  const Title = "Tareas Genéricas";
  
    return(
        <Fragment>
          {GChores === null &&
              <CircularProgress className={classes.progress}/>
          }
          { GChores !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={GChores}
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

              actions={[
                {
                  icon: 'add',
                  tooltip: 'Añadir Formatos ',
                  onClick: (event, rowData) => 
                  {
                    setGenericChore(rowData);
                    handleClickOpen()
                  }
                }
              ]}

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

        {(GChores !== null && genericChore !== null) &&
          <AddFormatLabelsDialog
              open = {open}
              handleClose = {handleClose}
              genericChore = {genericChore}
              change = {change}
              setChange = {setChange}
            />
        }

        </Fragment>

  )                
}

export default GenericChoresTable;

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));