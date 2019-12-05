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
import PropTypes from 'prop-types';
import Element from '../../../../models/Element';
import useElementGTask from './useElementGTaskViewModel';
import GenericElementGenericTask from '../../../../models/GenericElementGenericTask';

//import Functions from '../../../../providers/Providers'

export default function AddElementsDialog({open, handleClose, areaId, change, setChange}) {
  const classes = useStyles();

  //const {state, dispatch} = useContext(Functions);

  const {GElements} = useFetchGenericElement();
  const {ETypes} = useFetchElementType();
  const [Add] = useElementViewModel();
  const [AddElementGTask] = useElementGTask();
  

  const AddSelectedGElements = (data) =>
  {
    let elementsPromises = [];
    let tasksPromises = [];
    for (let i in data)
    {
      elementsPromises.push(Add(areaId, data[i]));
    }
    Promise.all(elementsPromises)
    .then((values)=> {
      for (let j = 0; j<values.length; j++)
      {
        let elementCreated = new Element(values[j].data);
        for (let k in data)
        {
          let gElement = data[k];
          if(elementCreated.GenericElementId === gElement.Id)
          {
            for( let m = 0; m < gElement.GenericElementGenericTasks.length; m++)
            {
              let gElementGTask = new GenericElementGenericTask(gElement.GenericElementGenericTasks[m]);
              tasksPromises.push(AddElementGTask(elementCreated.Id, gElementGTask))
            }
          }
        }
      }
    });

    Promise.all(tasksPromises).then(()=>
      {
        setChange(!change)
        handleClose();
      });
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
    { title: 'Nombre', field: 'Name', editable: 'always' },
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
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar Cambios
            </Button> */}
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
              tooltip: 'Añadir Elementos',
              onClick: (evt, data) => AddSelectedGElements(data)
            }
          ]}
        />
        }
      </Dialog>
  );
}

AddElementsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired, 
  areaId: PropTypes.string.isRequired,
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