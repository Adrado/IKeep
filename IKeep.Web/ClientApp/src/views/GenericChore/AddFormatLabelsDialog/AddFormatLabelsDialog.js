//Core
import React from 'react';

//Material-ui components
import {Grid} from '@material-ui/core' 

//Style components
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, AppBar, Toolbar, Typography, Slide } from '@material-ui/core';

//Validation
import PropTypes from 'prop-types';

//Models
import GenericChore from '../../../models/GenericChore';

//Tables
import FormatsTable from './FormatsTable';
import GChoreFLabelsTable from './GChoreFLabelsTable';

export default function AddFormatLabelsDialog({open, handleClose, genericChore, change, setChange}) {
  const classes = useStyles();
  
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
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            {genericChore !== null &&
              <GChoreFLabelsTable
                gChore = {genericChore}
              />
            }
          </Grid>

          <Grid item sm={6} xs={12}>
            {genericChore !== null &&
              <FormatsTable
                gChore = {genericChore}
                change = {change}
                setChange = {setChange}
              />
            }
          </Grid>
          
        </Grid>
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
