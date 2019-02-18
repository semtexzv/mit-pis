import { connect } from 'react-redux'
import {closeMenubar, openMenubar} from 'actions/MainActions'
import {unAuth} from 'actions/AuthActions'
import ContainedComponent from 'components/common/Header'

const mapStateToProps = (state) => {
  return {
    menuBarOpen: state.main.menuBarOpen,
    menuBarDocked: state.main.menuBarDocked,
    loggedIn: state.profile.id > 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    open: () => { dispatch(openMenubar()) },
    close: () => { dispatch(closeMenubar()) },
    logout: () => { dispatch(unAuth()) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
