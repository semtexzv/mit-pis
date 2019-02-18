import { connect } from 'react-redux'
import ContainedComponent from 'components/common/PageWrapper'

const mapStateToProps = (state) => {
  return {
    menuBarOpen: state.main.menuBarOpen && state.profile.id > 0, // when not logged in, menubar is always hidden
    menuBarDocked: state.main.menuBarDocked
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
