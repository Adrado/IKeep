import React, {Fragment} from 'react';
import { Button, Grid, TextField, FormControl, makeStyles, InputLabel, List, MenuItem, MenuList } from '@material-ui/core';
import PropTypes from 'prop-types';
import Chore from '../../models/Chore';
import Element from '../../models/Element';

const PreventiveMaintenanceTable = ({chores, elements}) =>
{
    if(chores !== null)
    {
      var choreItems = chores.map((chore) =>
        <MenuItem key={chore.Id} value = {chore}>
          {chore.Description}
        </MenuItem>
      );
    }

    if(elements !== null)
    {
      var elementItems = elements.map((element) =>
        <MenuItem key={element.Id} value = {element}>
          {element.Name}
        </MenuItem>
      );
    }

    return(
        <Fragment>

            <List>
                {choreItems}
            </List>
            <List>
                {elementItems}
            </List>
        </Fragment>
    )
}
export default PreventiveMaintenanceTable;

PreventiveMaintenanceTable.propTypes = {
    chores: PropTypes.arrayOf(PropTypes.instanceOf(Chore)),
    elements: PropTypes.arrayOf(PropTypes.instanceOf(Element))
  }; 