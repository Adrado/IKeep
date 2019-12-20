//Core
import React from 'react';

//Style components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, AppBar, Toolbar, Typography, Slide } from '@material-ui/core';

//MaterialTable
import MaterialTable from 'material-table';
import { localizationEsp } from '../../components/MaterialTableProps';

//CRUD Services
import useFetchFormatLabels from '../../views/FormatLabel/useFetchFormatLabels'
import useGChoreFLabelViewModel from './useGChoreFLabelViewModel';

//Validation
import PropTypes from 'prop-types';

//Models
import GenericChore from '../../models/GenericChore';


export default function AddFormatLabelsDialog({open, handleClose, genericChore, change, setChange}) {
  const classes = useStyles();

  const {FormatLabels} = useFetchFormatLabels();
  const [AddChoreLabel] = useGChoreFLabelViewModel();
  console.log(genericChore);
  console.log(genericChore.GenericChoreFormatLabels);

   const AddSelectedFLabels = (data) =>
  {
    let FLabelsPromises = [];
    for (let i in data)
    {
      FLabelsPromises.push(AddChoreLabel(genericChore.Id, data[i]));
    }
    Promise.all(FLabelsPromises)
    .then(()=> {
        setChange(!change)
        handleClose();
    });   
  } 
  
  const columns = [
    { title: 'Nombre', field: 'Name', editable: 'always' },
    { title: 'Extensión', field: 'Extension'}
    ] 
  const Title = "Elementos Genéricos";
  return (
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Descartar
            </Button>
            <Typography variant="h6" className={classes.title}>
              
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar Cambios
            </Button> */}
          </Toolbar>
        </AppBar>
        {FormatLabels !== null &&
        <MaterialTable
          data = {FormatLabels}
          columns = {columns}
          title = {Title}
          localization={localizationEsp}
          options={{
            selection: true,
            actionsColumnIndex: -1,
            filtering: true,
            toolbar: true,
            pageSize: 10,
            pageSizeOptions: [10, 20],
            /* rowStyle: rowData => ({
              backgroundColor: (row.tableData && row.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
            }) */
          }}

          actions={[
            {
              icon: 'add',
              tooltip: 'Añadir Elementos',
              onClick: (evt, data) => AddSelectedFLabels(data)
            }
          ]}
        />
        }
      </Dialog>
  );
}

AddFormatLabelsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired, 
  genericChore: PropTypes.instanceOf(GenericChore),
  change: PropTypes.bool.isRequired,
  setChange: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
