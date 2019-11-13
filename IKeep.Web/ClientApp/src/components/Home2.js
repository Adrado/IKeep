import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
 
const styles = theme => ({
  content: {
    ...theme.mixins.gutters(),
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
     
  }
});
function Home(props) {
  const { classes } = props;
  return (
    <div className={classes.content}>
        <Typography variant="h5" component="h3">
          Welcome Home!
        </Typography>
    </div>
  );
}
 
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Home);