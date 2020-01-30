//Core
import React from 'react';

//Style components
import { Button, Dialog, AppBar, Toolbar, Typography, Slide } from '@material-ui/core';
import useStyles from '../../../components/useStyles';

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


export default function SelectElementsDialog({open, handleClose, areaId, change, setChange}) {
  const classes = useStyles();

  return (
      <Dialog open={open} onClose={handleClose}>
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
