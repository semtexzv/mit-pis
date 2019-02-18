import { connect } from 'react-redux'
import ContainedComponent from 'components/pages/Login'
import { login } from 'actions/AuthProcedures'

const mapStateToProps = (state) => {
  return {
    loggedIn: typeof state.auth.token !== 'undefined' && typeof state.auth.token.length !== 'undefined' && state.auth.token.length > 0,
    syncingAuth: state.dataSyncing.auth,
    syncingProfile: state.dataSyncing.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (username, password, remember) => {
      dispatch(login(username, password, remember))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
