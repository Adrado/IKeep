import React from 'react';

import AreasService from '../services/AreasService';
import BuildingsService from '../services/BuildingsService';
import FloorsService from '../services/FloorsService';
import InstallationsService from '../services/InstallationsService';
import RolesService from '../services/RolesService';
import TreeViewService from '../services/TreeViewService';
import UsersService from '../services/UsersService';
import ElementTypesService from '../services/ElementTypesService';
import GenericElementsService from '../services/GenericElementsService';


export const CRUD =
{
    Area : new AreasService(),
    Building : new BuildingsService(),
    Floor : new FloorsService(),
    Installation : new InstallationsService(),
    Role : new RolesService(),
    TreeView : new TreeViewService(),
    User : new UsersService(),
    ElementType : new ElementTypesService(),
    GenericElement : new GenericElementsService(),
}

export const Services = React.createContext();
export const ElementTypeService = React.createContext(CRUD.ElementType);
export const Functions = React.createContext();

export const AuxiliarServices = React.createContext();