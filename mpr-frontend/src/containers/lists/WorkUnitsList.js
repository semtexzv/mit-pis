import { connect } from 'react-redux'
import ContainedComponent from 'components/lists/List'
import assign from 'lodash/assign'
import {detailTypes, projectStates} from 'config'
import statusRenderer from 'components/helpers/listValueRenderers/workUnitStatus'
import projectRenderer from 'components/helpers/listValueRenderers/project'
import { BaseList, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseList'
import DETAIL_DIALOG from 'containers/details/WorkUnitDetailDialog'
import REPOSITORY from 'storages/WorkUnitRepository'
import ProjectRepository from 'storages/ProjectRepository'
import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import uniq from 'lodash/uniq'

// help & documentation in BaseList
const ENTITY = detailTypes.WORK_UNIT
const ENTITY_NAME = 'work-unit'
const TITLE = 'Seznam činností'

class ListDispatchToProps extends BaseList {
  repository = REPOSITORY
  entity = ENTITY
  detailDialog = DETAIL_DIALOG

  getColumnData(state, props) {
    return [
      {name: 'id', numeric: false, padding: 'none', label: 'ID'},
      {name: 'name', numeric: false, padding: 'none', label: 'Název'},
      {name: 'projId', numeric: false, padding: 'none', label: 'Projekt', renderer: projectRenderer},
      {name: 'asigneesCount', numeric: true, padding: 'dense', label: 'Počet řešitelů'},
      {name: 'lastEdited', numeric: false, timeAgo: true, padding: 'dense', label: 'Poslední úprava'},
      {name: 'status', numeric: false, padding: 'none', label: 'Stav', renderer: statusRenderer}
    ]
  }

  getDataset(state, props) {
    let data = this.repository.get().slice()
    for (let i in data) {
      data[i].asigneesCount = data[i].asigneeIds.length
    }
    return data
  }

  getExtraFilters(state, props, setState, data) {
    const {projectFilter = 'ALL', projectState = 'ALL'} = state.extraFilters
    const allProjects = ProjectRepository.get()
    if (!allProjects) return null
    const exProjIds = uniq(REPOSITORY.get().map(i => i.projId))
    const projects = allProjects.filter(p => exProjIds.indexOf(p.id) >= 0)
    return (
      <Fragment>
        <div style={{width: '300px', maxWidth: '100%', padding: '0px 24px 4px', display: 'inline-block'}}>
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
        <div style={{width: '200px', maxWidth: '100%', padding: '0px 24px 4px', display: 'inline-block'}}>
          <TextField
            select
            label="Stav činnosti"
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
    const {projectFilter = 'ALL', projectState = 'ALL'} = state.extraFilters
    data = super.filterData(data, state, props)
    if (projectFilter !== 'ALL') {
      data = data.filter(item => item.projId === projectFilter)
    }
    if (projectState !== 'ALL') {
      data = data.filter(item => item.status === projectState)
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
