//Core
import React, {Fragment, useState} from 'react';
import useFetchCurrentChoresForToday from './useFetchCurrentChoresForToday';
import useFetchInstallationElements from './useFetchInstallationElements';
import PreventiveMaintenanceTable from './PreventiveMaintenanceTable';


const PreventiveMaintenanceView = () =>
{
    
    //Trabajo IKA9
    let id = "d27f7e6f-964e-4e4f-8b46-730037c0104e"; //Asus
    const {Chores} = useFetchCurrentChoresForToday(id);
    const {Elements} = useFetchInstallationElements(id);
    
    return(
        <Fragment>
            {(Chores !== null && Elements !== null) &&
            <PreventiveMaintenanceTable
                chores = {Chores}
                elements = {Elements}
            />
            }
        </Fragment>
    )
}

export default PreventiveMaintenanceView;