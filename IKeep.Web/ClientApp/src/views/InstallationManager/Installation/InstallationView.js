import React, {Fragment} from 'react';

//CRUD services
import useFetchInstallation from './useFetchInstallation'

//Views
import InstallationForm from './InstallationForm';
import InstallationUsersTable from './InstallationUser/InstallationUsersTable';

//Style components
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

//Validation
import PropTypes from 'prop-types';
import TreeNode from '../../../services/dtos/TreeNode'

/**
 * @param {TreeNode} treeNode
 */
const InstallationView = ({treeNode}) =>
{
    const classes = useStyles();
    const {fetchedInstallation, error} = useFetchInstallation(treeNode);
    
    return(
      <Fragment>

          {fetchedInstallation === null &&
            <CircularProgress className={classes.progress}/>
          }
          {error === true &&
            <h1>Error...</h1>
          }
          {fetchedInstallation !== null &&
            <InstallationForm
              installationData = {fetchedInstallation}
            />
          }
          {fetchedInstallation !== null &&
            <InstallationUsersTable
              installationId = {fetchedInstallation.Id}
            />
          }

      </Fragment>
    )
}

export default InstallationView;

InstallationView.propTypes = {
  treeNode: PropTypes.instanceOf(TreeNode),
};

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));