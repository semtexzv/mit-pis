import React from 'react'
import { connect } from 'react-redux'
import List from 'containers/lists/QualificationList'
import ContainedComponent from 'components/pages/ListPage'

const mapStateToProps = (state) => {
  return {
    title: 'Kvalifikace',
    heading: 'Kvalifikace'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    renderListComponent: () => {
      return (<List />)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
