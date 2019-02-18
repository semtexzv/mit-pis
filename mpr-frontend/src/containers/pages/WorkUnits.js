import React from 'react'
import { connect } from 'react-redux'
import List from 'containers/lists/WorkUnitsList'
import ContainedComponent from 'components/pages/ListPage'

const mapStateToProps = (state) => {
  return {
    title: 'Činnosti',
    heading: 'Činnosti'
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
