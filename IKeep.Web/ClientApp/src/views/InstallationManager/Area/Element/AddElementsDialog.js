//Core
import React from 'react';

//Style components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, AppBar, Toolbar, Typography, Slide } from '@material-ui/core';

//MaterialTable
import MaterialTable from 'material-table';
import { localizationEsp } from '../../../../components/MaterialTableProps';

//CRUD Services
import useFetchGenericElement from '../../../GenericElement/useFetchGenericElement'
import useFetchElementType from '../../../ElementType/useFetchElementType';
import useElementViewModel from './useElementViewModel';
import useElementGChore from './useElementGChoreViewModel';

//Validation
import PropTypes from 'prop-types';

//Models
import Element from '../../../../models/Element';
import GenericElementGenericChore from '../../../../models/GenericElementGenericChore';


export default function AddElementsDialog({open, handleClose, areaId, change, setChange}) {
  const classes = useStyles();

  const {GElements} = useFetchGenericElement();
  const {ETypes} = useFetchElementType();
  const [Add] = useElementViewModel();
  const [AddElementGChore] = useElementGChore();
  
  const AddSelectedGElements = (data) =>
  {
    let elementsPromises = [];
    let choresPromises = [];
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
            for( let m = 0; m < gElement.GenericElementGenericChores.length; m++)
            {
              let gElementGChore = new GenericElementGenericChore(gElement.GenericElementGenericChores[m]);
              choresPromises.push(AddElementGChore(elementCreated.Id, gElementGChore))
            }
          }
        }
      }
    });

    Promise.all(choresPromises).then(()=>
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