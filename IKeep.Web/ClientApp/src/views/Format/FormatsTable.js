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
import useFetchFormat from './useFetchFormat';
import useFormatViewModel from './useFormatViewModel';


const FormatsTable = () => 
{
  const classes = useStyles();
  const {state, dispatch} = useContext(Functions);

  const Select = (e, rowData) =>
  {
    dispatch({ type: 'SELECT_ROW', data: rowData,});
  }

  const {Formats, change, setChange} = useFetchFormat();
  const [Add, Save, Delete] = useFormatViewModel();
  const [row, setRow] = useState(state.selectedRow);
   
  //Info to Formats Table 

  const columns = [
    { title: 'Nombre', field: 'Name' },
  ] 

  const Title = "Formatos";
  
    return(
        <Fragment>
          {Formats === null &&
              <CircularProgress className={classes.progress}/>
          }
          { Formats !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={Formats}
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

export default FormatsTable;

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));