import { connect } from 'react-redux'
import ContainedComponent from 'components/Wrapper'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent))
