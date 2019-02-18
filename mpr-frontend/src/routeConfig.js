import React from 'react'
import Dashboard from 'containers/pages/Dashboard'
import People from 'containers/pages/People'
import Projects from 'containers/pages/Projects'
import Qualifications from 'containers/pages/Qualifications'
import Roles from 'containers/pages/Roles'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/Accessibility'
import ProjectsIcon from '@material-ui/icons/Work'
import QualificationsIcon from '@material-ui/icons/School'
import RolesIcon from '@material-ui/icons/AssignmentInd'
import WorkUnits from "./containers/pages/WorkUnits";
import AssignmentIcon from '@material-ui/icons/Assignment'

const routeConfig = [
  {
    route: '/',
    exactMatch: true,
    menuName: 'Přehled',
    menuIcon: (<DashboardIcon />),
    component: Dashboard
  },
  {
    route: '/people',
    exactMatch: false,
    menuName: 'Lidské zdroje',
    menuIcon: (<PeopleIcon />),
    component: People
  },
  {
    route: '/projects',
    exactMatch: false,
    menuName: 'Projekty',
    menuIcon: (<ProjectsIcon />),
    component: Projects
  },
  {
    route: '/qualifications',
    exactMatch: false,
    menuName: 'Kvalifikace',
    menuIcon: (<QualificationsIcon />),
    component: Qualifications
  },
  {
    route: '/roles',
    exactMatch: false,
    menuName: 'Role',
    menuIcon: (<RolesIcon />),
    component: Roles
  },
  {
    route: '/work-units',
    exactMatch: false,
    menuName: 'Činnosti',
    menuIcon: (<AssignmentIcon />),
    component: WorkUnits
  }
]

export default routeConfig
