//Core
import React, {Fragment} from 'react';

//MaterialTable
import MaterialTable from 'material-table';
import { localizationEsp } from '../../../components/MaterialTableProps';

//CRUD Services
import useFetchGChoreFLabels from './useFetchGChoreFLabels';
import useGChoreFLabelViewModel from './useGChoreFLabelViewModel';

//Validation
import PropTypes from 'prop-types';
import GenericChore from '../../../models/GenericChore';

const GChoreFLabelsTable = ({gChore}) =>
{
    const {GChoreFLabels} = useFetchGChoreFLabels(gChore.Id);
    console.log(GChoreFLabels);
    const [,,DeleteGChoreFlabel] = useGChoreFLabelViewModel();
    const colums = 
    [
        { title: 'Nombre', field: 'FormatName', editable: 'never' },
        { title: 'Extensión', field: 'FormatExtension', editable: 'never'}
    ] 
    const Title = gChore.Description;
    return(
      <Fragment>
        {GChoreFLabels !== null &&
          <MaterialTable
              data = {GChoreFLabels}
              columns = {colums}
              title = {Title}
              localization={localizationEsp}
              options={{
                  actionsColumnIndex: -1,
                  filtering: true,
                  toolbar: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20]}}

              editable={{
                      onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          DeleteGChoreFlabel(oldData)
                          .then(() => {
                            //setChange(!change);

                            resolve()
                          })
                        }),
                    }}
              />
          }
      </Fragment>
    )
}

export default GChoreFLabelsTable;

GChoreFLabelsTable.propTypes = {
  gChore: PropTypes.instanceOf(GenericChore),
};