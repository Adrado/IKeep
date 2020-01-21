//Core
import React, {Fragment, useState} from 'react';
import useFetchCurrentChoresForToday from './useFetchCurrentChoresForToday';

const PreventiveMaintenanceView = () =>
{
    let id = "11ba91ae-7f8f-42c1-982e-07bf369036a7";
    const {Installations} = useFetchCurrentChoresForToday(id);
    
    return(
        <Fragment>
            <h1>Dentro</h1>
        </Fragment>
    )
}

export default PreventiveMaintenanceView;