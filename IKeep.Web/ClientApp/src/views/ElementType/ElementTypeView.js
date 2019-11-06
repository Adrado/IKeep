import React, {Fragment, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useFetchElementType from './useFetchElementType';
import ElementTypeForm from './ElementTypeForm';
import DataTable from '../../components/DataTable';
import { makeStyles } from '@material-ui/core/styles';
import ElementType from '../../models/ElementType';

const ElementTypeView = () =>
{
    const classes = useStyles();
    const {fetchedElementType, error, onModify} = useFetchElementType();
    const [selectedRow, setSelectedRow] = useState(new ElementType);
    const columns = [
      { title: 'Ref', field: 'Ref' },
      { title: 'Nombre', field: 'Name' }
    ] 

    const SelectRow = (event, rowData) =>
    {
      setSelectedRow(rowData);
    }

    return(
      <Fragment>
        <ElementTypeForm
          elementTypeData = {selectedRow}
          onModify = {onModify}/>
        
        { fetchedElementType === null &&
          <CircularProgress className={classes.progress}/>
        }
        { error == true &&
          <h1>Error...</h1>
        }
        { fetchedElementType !== null &&
          <DataTable
            Data = {fetchedElementType}
            Columns = {columns}
            Select = {SelectRow}
            />  
        }
      </Fragment>
    )
}

export default ElementTypeView;

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));