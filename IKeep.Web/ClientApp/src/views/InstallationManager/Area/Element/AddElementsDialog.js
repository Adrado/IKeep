import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import MaterialTable from 'material-table';

import useFetchGenericElement from '../../../GenericElement/useFetchGenericElement'
import useFetchElementType from '../../../ElementType/useFetchElementType';
import { localizationEsp } from '../../../../components/MaterialTableProps';
import useElementViewModel from './useElementViewModel';

//import Functions from '../../../../providers/Providers'

export default function AddElementsDialog({open, handleClose, areaId}) {
  const classes = useStyles();

  //const {state, dispatch} = useContext(Functions);
  const {GElements} = useFetchGenericElement();
  const {ETypes} = useFetchElementType();
  const [Add] = useElementViewModel();


  const AddSelectedGElements = (data) =>
  {
    let p = [];
    for (let i in data)
    {
      console.log(areaId);
      console.log(data[i]);
      p.push(Add(areaId, data[i]));
    }

    Promise.all(p).then(()=> {
      handleClose();
    })
    console.log(p);
  }

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
  
  //Info to GenericElements Table 
  const LookupTypes = BuildField(ETypes);
  const columns = [
    { title: 'Nombre', field: 'Name' },
    { title: 'Tipo', field: 'ElementTypeId', lookup: LookupTypes}
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar Cambios
            </Button>
          </Toolbar>
        </AppBar>
        {GElements !== null &&
        <MaterialTable
          data = {GElements}
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
              tooltip: 'Añadir Tareas',
              onClick: (evt, data) => AddSelectedGElements(data)
            }
          ]}
        />
        }
      </Dialog>
  );
}


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