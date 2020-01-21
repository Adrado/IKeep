import React from 'react';

import PreventiveMaintenanceService from '../services/PreventiveMaintenanceService';

const prevMaintenance = new PreventiveMaintenanceService()

export const PrevMaintenanceService = React.createContext(prevMaintenance);