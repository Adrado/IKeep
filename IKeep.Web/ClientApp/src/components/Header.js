import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Typography,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
 
const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    marginLeft: '8px',
    width: 'auto',
    float: 'left',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
   searchIcon: {
    width: 119,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});
class Header extends React.Component {
  render() {
  const { classes } = this.props;
  return (<AppBar position="static">
     <Toolbar>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            React Material-UI
          </Typography>
          <div className={classes.grow}/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
  </AppBar>
  );
}
}
 
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Header);