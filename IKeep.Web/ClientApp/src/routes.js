/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

import BusinessIcon from '@material-ui/icons/Business';
// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import Typography from "./views/Typography/Typography.js";
import Icons from "./views/Icons/Icons.js";
import Maps from "./views/Maps/Maps.js";
import NotificationsPage from "./views/Notifications/Notifications.js";
import UpgradeToPro from "./views/UpgradeToPro/UpgradeToPro.js";

// core components/views for RTL layout
import RTLPage from "./views/RTLPage/RTLPage.js";

//Views
import InstallationManagerView from './views/InstallationManager/InstallationManagerView';
import ElementTypeView from './views/ElementType/ElementTypeView';
import GenericElementView from './views/GenericElement/GenericElementView';
import GenericTaskView from "./views/GenericTask/GenericTaskView.js";
import PriorityView from "./views/Priority/PriorityView.js";
import FormatView from "./views/Format/FormatView.js";
import CategoryView from "./views/Category/CategoryView.js";
import UserView from "./views/User/UserView"
import RoleView from "./views/Role/RolesView.js";

const dashboardRoutes = [
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
    path: "/genericTask",
    name: "Tareas",
    icon: "",
    component: GenericTaskView,
    layout: "/admin"
  },

  {
    path: "/priority",
    name: "Prioridades",
    icon: "",
    component: PriorityView,
    layout: "/admin"
  },

  {
    path: "/format",
    name: "Formatos",
    icon: "",
    component: FormatView,
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
    path: "/role",
    name: "Roles",
    icon: "",
    component: RoleView,
    layout: "/admin"
  },
  
/*
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  } */
];

export default dashboardRoutes;
