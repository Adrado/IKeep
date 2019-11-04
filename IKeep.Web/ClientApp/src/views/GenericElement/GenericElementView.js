import React from 'react';
import DataTable from '../../components/DataTable';
import GenericElementForm from './GenericElementForm';
const GenericElementView = () =>
{
    return(
        <React.Fragment>
            <GenericElementForm/>
            <DataTable/>
        </React.Fragment>
    )
}
export default GenericElementView;