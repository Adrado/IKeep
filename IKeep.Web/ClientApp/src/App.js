import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import UserViewModel from './views/User/UserViewModel';
import RoleViewModel from './views/Role/RoleViewModel';
import InstallationManagerView from './views/InstallationManager/InstallationManagerView';
import GenericElementView from './views/GenericElement/GenericElementView'
import ElementTypeView from './views/ElementType/ElementTypeView'

const App = () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/users' component={UserViewModel}/>
    <Route path='/roles' component={RoleViewModel}/>
    <Route path='/installations' component={InstallationManagerView}/>
    <Route path='/genericElements' component={GenericElementView}/>
    <Route path='/elementTypes' component={ElementTypeView}/>
  </Layout>
);

export default App;