import React, {Fragment, useContext, useState} from 'react';

//Styles Components
import {CircularProgress, makeStyles} from '@material-ui/core';

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../components/MaterialTableProps';

//Contexts
import {Functions} from '../../providers/Providers';

//CRUD Services
import useFetchCategory from './useFetchCategory';
import useCategoryViewModel from './useCategoryViewModel';


const CategoriesTable = () => 
{
  const classes = useStyles();
  const {state, dispatch} = useContext(Functions);

  const Select = (e, rowData) =>
  {
    dispatch({ type: 'SELECT_ROW', data: rowData,});
  }

  const {Categories, change, setChange} = useFetchCategory();
  const [Add, Save, Delete] = useCategoryViewModel();
  const [row, setRow] = useState(state.selectedRow);
   
  //Info to Categories Table 

  const columns = [
    { title: 'Nombre', field: 'Name' },
  ] 

  const Title = "Categorías";
  
    return(
        <Fragment>
          {Categories === null &&
              <CircularProgress className={classes.progress}/>
          }
          { Categories !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={Categories}
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

export default CategoriesTable;

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));