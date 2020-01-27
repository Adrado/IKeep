import React, {useState, useContext, Fragment} from 'react';
import {
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, } from '@material-ui/core';

import useFetchInstallations from '../GenerateChores/useFetchInstallations';
import {MapContext} from '../../providers/Providers';
import useStyles from '../../components/useStyles';

const InstallationSelect = () =>
{
    const [installationSelected, setInstallationSelected] = useState('');
    const {state, dispatch} = useContext(MapContext);

    const {Installations} = useFetchInstallations();

    if(Installations !== null)
    {
        var InstallationItems = Installations.map((installation) =>
        <MenuItem key={installation.Id} value = {installation}>
          {installation.Name}
        </MenuItem>
      );
    }

    const handleInstallationChange = event => 
    {
        setInstallationSelected(event.target.value);
        dispatch({ type: 'SELECT_INSTALLATION', data: event.target.value,});
        console.log(installationSelected.Id);
        console.log(state);
    };

    const classes = useStyles();

    return(
        <Fragment>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="Installations">Instalación</InputLabel>
                <Select
                    labelId="Installation"
                    id="demo-simple-select-filled"
                    value={installationSelected}
                    onChange={handleInstallationChange}
                >
                    {InstallationItems}
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default InstallationSelect;