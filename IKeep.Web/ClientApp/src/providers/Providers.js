import React from 'react';
import InstallationsService from '../services/InstallationsService';

 const InstallationSvc = React.createContext(new InstallationsService());

 export default InstallationSvc;