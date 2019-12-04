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
import FormatsService from '../services/FormatsService';
import GenericTasksService from '../services/GenericTasksService';
import PrioritiesService from '../services/PrioritiesService';
import TasksService from '../services/TasksService';
import GenericElementGenericTasksService from '../services/GenericElementGenericTasksService';
import ElementsService from '../services/ElementsService';
import ElementGenericTasksService from '../services/ElementGenericTasksService';
import InstallationUsersService from '../services/InstallationUsersService';


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
    Format: new FormatsService(),
    GenericTask: new GenericTasksService(),
    Priority: new PrioritiesService(),
    Task: new TasksService(),
    GElementGTask: new GenericElementGenericTasksService(),
    Element: new ElementsService(),
    ElementGTask: new ElementGenericTasksService(),
    InstallationUser: new InstallationUsersService(),
}

//CRUD SERVICES
export const ElementTypeService = React.createContext(CRUD.ElementType);
export const GenericTaskService = React.createContext(CRUD.GenericTask);
export const GenericElementService = React.createContext(CRUD.GenericElement);
export const CategoryService = React.createContext(CRUD.Category);
export const FormatService = React.createContext(CRUD.Format);
export const PriorityService = React.createContext(CRUD.Priority);
export const GElementGTaskService = React.createContext(CRUD.GElementGTask);
export const UserService = React.createContext(CRUD.User);
export const RoleService = React.createContext(CRUD.Role);
export const ElementService = React.createContext(CRUD.Element);
export const ElementGTaskService = React.createContext(CRUD.ElementGTask);
export const InstallationUserService = React.createContext(CRUD.InstallationUser);

//Auxiliar Context
export const Functions = React.createContext();
export const Services = React.createContext();
