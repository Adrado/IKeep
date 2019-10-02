import React from 'react';
import  Container  from '@material-ui/core/Container';
import NavMenu from './NavMenu';

export default props => (
  <div>
    <NavMenu />
    <Container fixed>
      {props.children}
    </Container>
  </div>
);
