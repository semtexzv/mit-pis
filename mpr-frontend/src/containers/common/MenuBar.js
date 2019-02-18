import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import {dockMenubar, undockMenubar, closeMenubar, openMenubar} from 'actions/MainActions'
import ContainedComponent from 'components/common/MenuBar'
import LoginIcon from '@material-ui/icons/VpnKey'
import routeConfig from 'routeConfig'

const mapStateToProps = (state) => {
  return {
    menuBarOpen: state.main.menuBarOpen && state.profile.id > 0, // when not logged in, menubar is always hidden
    menuBarDocked: state.main.menuBarDocked,
    loggedIn: state.profile.id > 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dock: () => { dispatch(dockMenubar()) },
    undock: () => { dispatch(undockMenubar()) },
    open: () => { dispatch(openMenubar()) },
    close: () => { dispatch(closeMenubar()) },
    getMenu: (props) => getMenu(dispatch, props)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent))

function getMenu(dispatch, props) {
  if (!props.loggedIn) {
    return [{
      route: '/login',
      action: () => { },
      text: 'Přihlášení',
      icon: (<LoginIcon />)
    }]
  }
  const {pathname} = props.location
  return routeConfig.map(route => ({
    route: route.route,
    action: () => { dispatch(push(route.route)) },
    text: route.menuName,
    icon: route.menuIcon,
    selected: route.route === pathname
  }))
}
