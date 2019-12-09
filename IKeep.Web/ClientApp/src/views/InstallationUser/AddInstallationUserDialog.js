import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';


import PropTypes from 'prop-types';

import useFetchUsers from '../User/useFetchUsers';
import useFetchInstallations from './useFetchInstallations';
import useInstallationUserViewModel from './useInstallationUserViewModel';
import MaterialTable from 'material-table';



//import Functions from '../../../../providers/Providers'

export default function AddInstallationUserDialog({open, handleClose, change, setChange}) {
  const classes = useStyles();

  //const {state, dispatch} = useContext(Functions);

  const {Users} = useFetchUsers();
  const {Installations} = useFetchInstallations();
  const [Add] = useInstallationUserViewModel();

  

  /* const AddSelectedGElements = (data) =>
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
    }); */

    /* Promise.all(tasksPromises).then(()=>
    {
      setChange(!change)
      handleClose();
    });
  } */

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
  const LookupTypes = BuildField();
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
        <Grid container spacing={5}>
          <Grid xs={12} sm={12} lg={6}>
            
          </Grid>
          <Grid xs={12} sm={12} lg={6}>
            
          </Grid>
        </Grid>
      </Dialog>
  );
}

AddInstallationUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired, 
  areaId: PropTypes.string.isRequired
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