import React, { Fragment, useContext } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import CheckboxList from './CheckboxList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Element from '../../../models/Element'

import {PreventiveMaintenanceContext} from '../PreventiveMaintenanceView';

const emails = ['username@gmail.com', 'user02@gmail.com'];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleDialog(props) {

  const { onClose, selectedValue, open, elements } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    console.log(checked);
  };

  const {state, dispatch} = useContext(PreventiveMaintenanceContext);

  

  const AddAll = () =>
  {
    dispatch({ type: 'ADD_CHORES', data: state.selectedChores.concat(elements)});
  }

  const AddSelected = () =>
  {
    dispatch({ type: 'ADD_CHORES', data: state.selectedChores.concat(checked)});
    console.log(state.selectedChores)
  }


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Elementos</DialogTitle>
      <Button variant="outlined" color="primary" onClick={AddAll}>
          Añadir Todos
      </Button>
      <List className={classes.root}>
        {elements.map(value => {
        const labelId = `checkbox-list-label-${value.Name}`;

        return(
          <ListItem key={value.Id} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.Name} />
          </ListItem>
        );
      })}
      </List>
      <Button variant="outlined" color="primary" onClick={AddSelected}>
        Añadir Seleccionados
      </Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(PropTypes.instanceOf(Element))
}; 

export default function SimpleDialogDemo({elements}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        10
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} elements={elements}/>
    </div>
  );
}