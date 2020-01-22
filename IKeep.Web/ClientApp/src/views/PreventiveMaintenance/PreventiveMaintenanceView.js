//Core
import React, {Fragment, useState} from 'react';
import useFetchCurrentChoresForToday from './useFetchCurrentChoresForToday';
import useFetchInstallationElements from './useFetchInstallationElements';


const PreventiveMaintenanceView = () =>
{
    
    /* //Casa IKA8
    let id = "d24ab749-87e9-43a9-9c7f-70d7021e5c83" */

    //Trabajo IKA9
    let id = "1cbf9925-7005-49ac-856c-e4348256af21";
    const {Chores} = useFetchCurrentChoresForToday(id);
    const {Elements} = useFetchInstallationElements(id);
    
    return(
        <Fragment>
            <h1>Dentro</h1>
        </Fragment>
    )
}

export default PreventiveMaintenanceView;