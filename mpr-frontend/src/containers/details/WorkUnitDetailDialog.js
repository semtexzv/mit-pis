import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialog'
import assign from 'lodash/assign'
import {detailTypes, projectStates} from 'config'
import {detailActions} from 'definitions'
import { BaseDetailDialog, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseDetailDialog'
import REPOSITORY from 'storages/WorkUnitRepository'
import ProjectRepository from 'storages/ProjectRepository'
import PersonRepository from 'storages/PersonRepository'
import {getFullName} from 'helpers'
import DetailDialogForm from 'components/details/DetailDialogForm'
import WorkUnitAsignees from './WorkUnitAsignees'

// help & documentation in BaseDetailDialog
const ENTITY = detailTypes.WORK_UNIT
const ENTITY_NAME = 'work-unit'

class WorkUnitDetailDialog extends BaseDetailDialog {
  repository = REPOSITORY
  entity = ENTITY

  getFormDefinitons(state, props) {
    return [
      {name: 'name', type: 'text', label: 'Název', required: true},
      {name: 'description', type: 'text', label: 'Popis', required: false},
      {name: 'status', type: 'select', label: 'Stav', options: ::this.getWorkUnitStatusSelection(), required: false},
      {name: 'projId', type: 'select', label: 'Projekt', options: ::this.getProjectSelection(), required: true},
      {name: 'sortOrder', type: 'text', label: 'Pořadí zobrazení v RASCI (číslo)', required: false}
    ]
  }

  getTabs(state, props) {
    return {
      'Informace': DetailDialogForm,
      'Řešitelé': WorkUnitAsignees
    }
  }

  getProjectSelection() {
    const items = ProjectRepository.get()
    if (!items || !items.length) return []
    const selection = items.map(item => ({
      value: item.id,
      label: item.name
    }))
    return selection
  }

  getWorkUnitStatusSelection() {
    return Object.keys(projectStates).map(state => ({
      value: state,
      label: projectStates[state]
    }))
  }

  getAsigneesSelection() {
    const items = PersonRepository.get()
    return items.map(item => ({
      value: item.id,
      label: `${getFullName(item)} (${item.login})`
    }))
  }
}

const mapStateToProps = (state) => {
  return assign(getBaseStateToPropsMappings(state), {
    title: state.main.detailDialogAction === detailActions.CREATE ? 'Nová činnost' : 'Detail činnosti',
    open: state.main.detailDialogOpen === ENTITY,
    loading: state.dataSyncing[ENTITY_NAME]
  })
}

export default connect(
  mapStateToProps,
  createMapDispatchToProps(WorkUnitDetailDialog)
)(ContainedComponent)
