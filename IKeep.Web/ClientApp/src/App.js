import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import InstallationManagerView from './views/InstallationManager/InstallationManagerView';
import GenericElementView from './views/GenericElement/GenericElementView'
import ElementTypeView from './views/ElementType/ElementTypeView'

import {Services, ElementTypeService , CRUD} from './providers/Providers';
import Layout2 from './components/Layout2';

const App = () => (
  <Layout2></Layout2>
  
);

export default App;
