import { connect } from 'react-redux'
import ContainedComponent from 'components/lists/List'
import assign from 'lodash/assign'
import {detailTypes} from 'config'
import projectRenderer from 'components/helpers/listValueRenderers/project'
import { BaseList, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseList'
import DETAIL_DIALOG from 'containers/details/RoleDetailDialog'
import REPOSITORY from 'storages/RoleRepository'
import ProjectRepository from 'storages/ProjectRepository'
import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import uniq from 'lodash/uniq'

// help & documentation in BaseList
const ENTITY = detailTypes.ROLE
const ENTITY_NAME = 'role'
const TITLE = 'Seznam rolí'

class ListDispatchToProps extends BaseList {
  repository = REPOSITORY
  entity = ENTITY
  detailDialog = DETAIL_DIALOG

  getColumnData(state, props) {
    return [
      {name: 'id', numeric: false, padding: 'none', label: 'ID'},
      {name: 'name', numeric: false, padding: 'none', label: 'Název'},
      {name: 'projectId', numeric: false, padding: 'none', label: 'Projekt', renderer: projectRenderer},
      {name: 'lastModified', numeric: false, timeAgo: true, padding: 'dense', label: 'Poslední úprava'}
      // {name: 'active', numeric: false, padding: 'none', label: 'Aktivní', renderer: activeRenderer}
    ]
  }

  getExtraFilters(state, props, setState, data) {
    const {projectFilter = 'ALL'} = state.extraFilters
    const allProjects = ProjectRepository.get()
    if (!allProjects) return null
    const exProjIds = uniq(REPOSITORY.get().map(i => i.projectId))
    const projects = allProjects.filter(p => exProjIds.indexOf(p.id) >= 0)
    return (
      <Fragment>
        <div style={{width: '300px', maxWidth: '100%', padding: '0px 24px 4px'}}>
          <TextField
            select
            label="Projekt"
            margin="normal"
            fullWidth
            value={projectFilter}
            onChange={e => setState({extraFilters: {...state.extraFilters, projectFilter: e.target.value}})}
          >
            <MenuItem key={0} value="ALL">Vše</MenuItem>
            {projects.map(proj => (
              <MenuItem key={proj.id} value={proj.id}>
                {proj.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Fragment>
    )
  }

  filterData(data, state, props) {
    const {projectFilter = 'ALL'} = state.extraFilters
    data = super.filterData(data, state, props)
    if (projectFilter !== 'ALL') {
      return data.filter(item => item.projectId === projectFilter)
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
