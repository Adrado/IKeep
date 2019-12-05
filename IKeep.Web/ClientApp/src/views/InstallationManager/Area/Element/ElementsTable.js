import React, {Fragment, useContext, useState} from 'react';
import {CircularProgress, makeStyles} from '@material-ui/core';

//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../../../components/MaterialTableProps';

//Dialog
import AddElementsDialog from './AddElementsDialog';

//Contexts
//import {Functions} from '../../../../providers/Providers';

//CRUD Services
import useFetchElements from './useFetchElements';
import useElementViewModel from './useElementViewModel';

import PropTypes from 'prop-types';

const ElementsTable = ({areaId}) => 
{
  const classes = useStyles();
  
  const {Elements, change, setChange} = useFetchElements(areaId);
  const [, Save, Delete] = useElementViewModel();
  const [, setRow] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  //Info to Elements Table 
  const LookupState = Object.freeze({
    0: "Inactivo",
    1: "Activo"
  });
  
  const columns = [
    { title: 'Estado', field: 'Status', lookup: LookupState },
    { title: 'Ref', field: 'Ref' },
    { title: 'Nombre', field: 'Name', editable: 'never' },
    { title: 'Tipo', field: 'TypeName', editable: 'never'},
    { title: 'Marca', field: 'Brand' },
    { title: 'Modelo', field: 'Model' },
    { title: 'Descripción', field: 'Description' },
    { title: 'Salud&Seg', field: 'SafetyAndHealth' },
    ];

  const Title = "Elementos";
  
    return(
        <Fragment>
          {Elements === null &&
              <CircularProgress className={classes.progress}/>
          }
          {Elements !== null &&
            <MaterialTable
              title = {Title}
              columns={columns}
              data={Elements}
              //onRowClick={((evt, selectedRow) => setRow(selectedRow))}

              options={{
                actionsColumnIndex: -1,
                filtering: true,
                toolbar: true,
                pageSize: 5,
                pageSizeOptions: [5, 10, 20],
                /*rowStyle: rowData => ({
                  backgroundColor: (row.tableData && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                }) */
              }}

              actions={[
                {
                  icon: 'add',
                  isFreeAction: true,
                  tooltip: 'Añadir Elementos',
                  onClick: () => handleClickOpen()
                }
              ]}

              onRowClick={((evt, selectedRow) => 
                {
                  //AddElementsDialog()
                  setRow(selectedRow) 
                }
                )}

              localization={localizationEsp}

              editable={{

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

        {Elements !== null &&
        <AddElementsDialog
            open = {open}
            handleClose = {handleClose}
            areaId = {areaId}
            change = {change}
            setChange = {setChange}
          />
        }
        </Fragment>
  )                
}

export default ElementsTable;

ElementsTable.propTypes = {
  handleClickOpen: PropTypes.func.isRequired, 
  areaId: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));