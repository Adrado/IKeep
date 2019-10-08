import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import UserViewModel from './views/User/UserViewModel';
import RoleViewModel from './views/Role/RoleViewModel';
import InstallationManagerModel from './views/InstallationManager/InstallationManagerModel';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    <Route path='/users' component={UserViewModel}/>
    <Route path='/roles' component={RoleViewModel}/>
    <Route path='/installations' component={InstallationManagerModel}/>
  </Layout>
);
