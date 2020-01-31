import React, {Fragment} from 'react';
import { ListItemIcon, Checkbox, Button, Grid, TextField, FormControl, makeStyles, InputLabel, List, MenuItem, MenuList, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import Chore from '../../models/Chore';
import Element from '../../models/Element';
import CheckboxList from './Components/CheckboxList';
import SimpleDialogDemo from './Components/SelectElementsDialog';

const PreventiveMaintenanceTable = ({chores, elements}) =>
{

    if(elements !== null)
    {
      var elementItems = elements.map((element) =>
        <ListItem key={element.Id} value = {element}>
          {element.Name}
          <ListItemIcon>
              <Checkbox
                /* edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }} */
              />
            </ListItemIcon>
        </ListItem>
      );
    } 
    

    return(
        <Fragment>
            {/* <CheckboxList
              elements = {elements}
            /> */}
            <SimpleDialogDemo
              elements = {elements}
            /> 
        </Fragment>
    )
}
export default PreventiveMaintenanceTable;

PreventiveMaintenanceTable.propTypes = {
    chores: PropTypes.arrayOf(PropTypes.instanceOf(Chore)),
    elements: PropTypes.arrayOf(PropTypes.instanceOf(Element))
  }; 



  /* if(chores !== null)
    {
      var choreItems = chores.map((chore) =>
        <MenuItem key={chore.Id} value = {chore}>
          {chore.Description}
        </MenuItem>
      );
    } */

    /* if(elements !== null)
    {
      var elementItems = elements.map((element) =>
        <MenuItem key={element.Id} value = {element}>
          {element.Name}
        </MenuItem>
      );
    } */