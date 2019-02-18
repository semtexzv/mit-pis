import { connect } from 'react-redux'
import ContainedComponent from 'components/lists/List'
import assign from 'lodash/assign'
import {detailTypes, projectStates} from 'config'
// import {getFullName} from 'helpers'
import statusRenderer from 'components/helpers/listValueRenderers/projectStatus'
import { BaseList, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseList'
import DETAIL_DIALOG from 'containers/details/ProjectDetailDialog'
import REPOSITORY from 'storages/ProjectRepository'
import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'

// help & documentation in BaseList
const ENTITY = detailTypes.PROJECT
const ENTITY_NAME = 'project'
const TITLE = 'Seznam projektů'

class ListDispatchToProps extends BaseList {
  repository = REPOSITORY
  entity = ENTITY
  detailDialog = DETAIL_DIALOG

  getColumnData(state, props) {
    return [
      {name: 'id', numeric: false, padding: 'none', label: 'ID'},
      {name: 'name', numeric: false, padding: 'none', label: 'Název'},
      {name: 'description', numeric: false, padding: 'none', label: 'Popis'},
      {name: 'lastModified', numeric: false, timeAgo: true, padding: 'dense', label: 'Poslední úprava'},
      {name: 'status', numeric: false, padding: 'none', label: 'Stav', renderer: statusRenderer}
    ]
  }

  getExtraFilters(state, props, setState, data) {
    const {projectState = 'ALL'} = state.extraFilters
    return (
      <Fragment>
        <div style={{width: '250px', maxWidth: '100%', padding: '0px 24px 4px'}}>
          <TextField
            select
            label="Stav projektu"
            margin="normal"
            fullWidth
            value={projectState}
            onChange={e => setState({extraFilters: {...state.extraFilters, projectState: e.target.value}})}
          >
            <MenuItem key={0} value="ALL">Vše</MenuItem>
            {Object.keys(projectStates).map(state => (
              <MenuItem key={state} value={state}>
                {projectStates[state]}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Fragment>
    )
  }

  filterData(data, state, props) {
    const {projectState = 'ALL'} = state.extraFilters
    data = super.filterData(data, state, props)
    if (projectState !== 'ALL') {
      return data.filter(item => item.status === projectState)
    }
    return data
  }
}

const mapStateToProps = (state) => {
  return assign(getBaseStateToPropsMappings(state), {
    title: TITLE,
    deleteInProgress: state.dataSyncing[ENTITY_NAME]
  })
}

export default connect(
  mapStateToProps,
  createMapDispatchToProps(ListDispatchToProps)
)(ContainedComponent)
