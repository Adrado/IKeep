
import BusinessIcon from '@material-ui/icons/Business';
//Views
import InstallationManagerView from './views/InstallationManager/InstallationManagerView';
import ElementTypeView from './views/ElementType/ElementTypeView';
import GenericElementView from './views/GenericElement/GenericElementView';
import GenericChoreView from "./views/GenericChore/GenericChoreView.js";
import ChoreTypeView from "./views/ChoreType/ChoreTypeView.js";
import FormatLabelView from "./views/FormatLabel/FormatLabelView.js";
import CategoryView from "./views/Category/CategoryView.js";
import UserView from "./views/User/UserView";
import RoleView from "./views/Role/RolesView.js";
import InstallationUserView from './views/InstallationUser/InstallationUserView';
import GenerateChoresView from './views/GenerateChores/GenerateChoresView';
import PreventiveMaintenanceView from './views/PreventiveMaintenance/PreventiveMaintenanceView';

const dashboardRoutes = [
  /* {
    name: "Usuarios",
    children: 
    {
      path: "/user",
      name: "Usuarios",
      icon: "",
      component: UserView,
      layout: "/admin"
    }
  } */

  {
    path: "/installationManager",
    name: "Administrar Instalaciones",
    icon: BusinessIcon,
    component: InstallationManagerView,
    layout: "/admin"
  },
  
  {
    path: "/genericElement",
    name: "Elementos Genéricos",
    icon: "",
    component: GenericElementView,
    layout: "/admin"
  },

  {
    path: "/elementType",
    name: "Tipos de Elementos",
    icon: "",
    component: ElementTypeView,
    layout: "/admin"
  },

  {
    path: "/genericChore",
    name: "Tareas Genéricas",
    icon: "",
    component: GenericChoreView,
    layout: "/admin"
  },

  {
    path: "/choreType",
    name: "Tipo de Tareas",
    icon: "",
    component: ChoreTypeView,
    layout: "/admin"
  },

  {
    path: "/formatLabel",
    name: "Formatos",
    icon: "",
    component: FormatLabelView,
    layout: "/admin"
  },

  {
    path: "/category",
    name: "Categorías",
    icon: "",
    component: CategoryView,
    layout: "/admin"
  },

  {
    path: "/user",
    name: "Usuarios",
    icon: "",
    component: UserView,
    layout: "/admin"
  },

  {
    path: "/installationUser",
    name: "Usuarios Instalaciones",
    icon: "",
    component: InstallationUserView,
    layout: "/admin"
  },

  {
    path: "/role",
    name: "Roles",
    icon: "",
    component: RoleView,
    layout: "/admin"
  },

  {
    path: "/chore",
    name: "Generar Ordenes",
    icon: "",
    component: GenerateChoresView,
    layout: "/admin"
  },

  {
    path: "/PrevMaintenance",
    name: "Mantenimiento Preventivo",
    icon: "",
    component: PreventiveMaintenanceView,
    layout: "/admin"
  }


  
  
];

export default dashboardRoutes;
