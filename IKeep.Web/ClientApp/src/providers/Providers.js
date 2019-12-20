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
import CategoriesService from '../services/CategoriesService';
import FormatLabelsService from '../services/FormatLabelsService';
import GenericChoresService from '../services/GenericChoresService';
import PrioritiesService from '../services/PrioritiesService';
import ChoresService from '../services/ChoresService';
import GenericElementGenericChoresService from '../services/GenericElementGenericChoresService';
import ElementsService from '../services/ElementsService';
import ElementGenericChoresService from '../services/ElementGenericChoresService';
import InstallationUsersService from '../services/InstallationUsersService';
import GenericChoreFormatLabel from '../models/GenericChoreFormatLabel';

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
    Category: new CategoriesService(),
    FormatLabel: new FormatLabelsService(),
    GenericChore: new GenericChoresService(),
    Priority: new PrioritiesService(),
    Chore: new ChoresService(),
    GElementGChore: new GenericElementGenericChoresService(),
    Element: new ElementsService(),
    ElementGChore: new ElementGenericChoresService(),
    InstallationUser: new InstallationUsersService(),
    GChoreFLabel : new GenericChoreFormatLabel(),
}

//CRUD SERVICES
export const ElementTypeService = React.createContext(CRUD.ElementType);
export const GenericChoreService = React.createContext(CRUD.GenericChore);
export const GenericElementService = React.createContext(CRUD.GenericElement);
export const CategoryService = React.createContext(CRUD.Category);
export const FormatLabelService = React.createContext(CRUD.FormatLabel);
export const PriorityService = React.createContext(CRUD.Priority);
export const GElementGChoreService = React.createContext(CRUD.GElementGChore);
export const UserService = React.createContext(CRUD.User);
export const RoleService = React.createContext(CRUD.Role);
export const ElementService = React.createContext(CRUD.Element);
export const ElementGChoreService = React.createContext(CRUD.ElementGChore);
export const InstallationUserService = React.createContext(CRUD.InstallationUser);
export const InstallationService = React.createContext(CRUD.Installation);
export const ChoreService = React.createContext(CRUD.Chore);
export const GChoreFLabelService = React.createContext(CRUD.GChoreFLabel);

//Auxiliar Context
export const Functions = React.createContext();
export const Services = React.createContext();
