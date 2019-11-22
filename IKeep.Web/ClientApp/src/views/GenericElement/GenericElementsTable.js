import React, {Fragment, useContext, useState} from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core' 

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../components/MaterialTableProps'

//Contexts
import {Functions} from '../../providers/Providers';

//CRUD Services
import useFetchGenericElement from './useFetchGenericElement';
import useGenericElementViewModel from './useGenericElementViewModel';
import useFetchElementType from '../ElementType/useFetchElementType';


const GenericElementsTable = () => 
{
  const classes = useStyles();
  const {dispatch} = useContext(Functions);

  const Select = (e, rowData) =>
  {
    dispatch({ type: 'SELECT_ROW', data: rowData,});
  }

  const {ETypes} = useFetchElementType();
  console.log(ETypes)
  const {GElements, change, setChange} = useFetchGenericElement();
  const [Add, Save, Delete] = useGenericElementViewModel();
  const [row, setRow] = useState(null);
   
  const BuildFieldType = () =>
  {
    let lookupTypes = {}
    for (let i in ETypes)
    {
      let type = ETypes[i];
      lookupTypes[type.Id] = type.Name;
    }
    return lookupTypes;
  }

  //Info to GenericElements Table 
  const LookupTypes = BuildFieldType();
  const columns = [
    { title: 'Nombre', field: 'Name' },
    { title: 'Tipo', field: 'ElementTypeId', lookup: LookupTypes}
    ] 
  const Title = "Elementos Genéricos";
  
    return(
        <Fragment>
          {GElements === null &&
              <CircularProgress className={classes.progress}/>
          }
          { GElements !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={GElements}
              //onRowClick={((evt, selectedRow) => setRow(selectedRow))}

              options={{
                actionsColumnIndex: -1,
                filtering: true,
                toolbar: true,
                pageSize: 10,
                pageSizeOptions: [10, 20],
                rowStyle: rowData => ({
                  backgroundColor: (row && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
              }}

              localization={localizationEsp}

              actions={[
                {
                  icon: 'visibility',
                  tooltip: 'Ver Tareas',
                  onClick: (event, rowData) => {
                    Select(event, rowData);
                    console.log(rowData)
                    setRow(rowData)
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
        </Fragment>
  )                
}

export default GenericElementsTable;

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));