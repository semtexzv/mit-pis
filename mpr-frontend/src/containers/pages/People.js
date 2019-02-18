import React from 'react'
import { connect } from 'react-redux'
import List from 'containers/lists/PersonList'
import ContainedComponent from 'components/pages/ListPage'

const mapStateToProps = (state) => {
  return {
    title: 'Lidské zdroje',
    heading: 'Lidské zdroje'
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
