import React from 'react';
import LoginService from '../services/LoginService';

const LogServ = new LoginService();

export const LogService = React.createContext(LogServ);