//Core
import React, {Fragment,} from 'react';
//Style Components
import {CircularProgress, makeStyles} from '@material-ui/core' 
//Table
import MaterialTable from 'material-table';
import {localizationEsp} from '../../../components/MaterialTableProps'

//CRUD Services
import useFetchFormatLabels from '../../FormatLabel/useFetchFormatLabels';
import useGChoreFLabelViewModel from './useGChoreFLabelViewModel';

//Validations
import PropTypes from 'prop-types';
import GenericChore from '../../../models/GenericChore';

const FormatsTable = ({gChore, change, setChange, handleClose}) => 
{
  const classes = useStyles();

  const {FormatLabels} = useFetchFormatLabels();
  const [AddChoreLabel] = useGChoreFLabelViewModel();

  const AddSelectedFLabels = (data) =>
  {
    let FLabelsPromises = [];
    for (let i in data)
    {
      FLabelsPromises.push(AddChoreLabel(gChore.Id, data[i]));
    }
    Promise.all(FLabelsPromises)
    .then(()=> {
        setChange(!change)
        handleClose();
    });   
  } 

  const isSelected = (rowData) =>
  {
    let result = gChore.GenericChoreFormatLabels.find(GChoreFLabel => GChoreFLabel.formatLabelId === rowData.Id);

    if (result !== undefined && result !== null && result.formatLabelId === rowData.Id)
      return true;
    else
      return false;
  }

  //Info to Formats Table 

  const columns = [
    { title: 'Nombre', field: 'Name' },
    { title: 'Extensión', field: 'Extension' },
  ] 

  const Title = "Formatos";
  
    return(
        <Fragment>
          {FormatLabels === null &&
              <CircularProgress className={classes.progress}/>
          }
          { FormatLabels !== null &&
            <MaterialTable
            data = {FormatLabels}
            columns = {columns}
            title = {Title}
            localization={localizationEsp}
            options={{
              actionsColumnIndex: -1,
              filtering: true,
              toolbar: true,
              pageSize: 10,
              pageSizeOptions: [10, 20],
              showSelectAllCheckbox: false,
              selection: true,
              selectionProps: rowData => ({
                  disabled: isSelected(rowData)
              }),  
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Añadir Elementos',
                onClick: (evt, data) => AddSelectedFLabels(data)
              }
            ]}
          />
          }
        </Fragment>
  )                
}
export default FormatsTable;

FormatsTable.propTypes = {
    //handleClose: PropTypes.func.isRequired, 
    gChore: PropTypes.instanceOf(GenericChore),
    change: PropTypes.bool.isRequired,
    setChange: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
  };
const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));