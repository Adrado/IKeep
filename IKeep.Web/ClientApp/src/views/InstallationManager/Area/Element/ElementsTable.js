import React, {Fragment, useContext, useState} from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core' 

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../components/MaterialTableProps'

//Contexts
import {Functions} from '../../providers/Providers';

//CRUD Services
import useFetchElements from './useFetchElements';
import useElementViewModel from './useElementViewModel';
import useFetchElementType from '../ElementType/useFetchElementType';


const ElementsTable = () => 
{
  const classes = useStyles();
  const {state, dispatch} = useContext(Functions);

  const Select = (e, rowData) =>
  {
    dispatch({ type: 'SELECT_ROW', data: rowData,});
  }

  const {ETypes} = useFetchElementType();
  //console.log(ETypes)
  const {Elements, change, setChange} = useFetchElements();
  const [Add, Save, Delete] = useElementViewModel();
  const [row, setRow] = useState(state.selectedRow);
   
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

  //Info to Elements Table 
  const LookupTypes = BuildFieldType();
  const columns = [
    { title: 'Nombre', field: 'Name' },
    { title: 'Tipo', field: 'ElementTypeId', lookup: LookupTypes}
    ] 
  const Title = "Elementos Genéricos";
  
    return(
        <Fragment>
          {Elements === null &&
              <CircularProgress className={classes.progress}/>
          }
          { Elements !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={Elements}
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

export default ElementsTable;

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));