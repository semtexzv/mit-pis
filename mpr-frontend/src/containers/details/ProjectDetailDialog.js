import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialog'
import assign from 'lodash/assign'
import { detailTypes, projectStates } from 'config'
import { detailActions } from 'definitions'
import { getFullName } from 'helpers'
import { BaseDetailDialog, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseDetailDialog'
import DetailDialogForm from 'components/details/DetailDialogForm'
import ProjectParticipants from './ProjectParticipants'
import ProjectMatrix from './ProjectMatrix'
import REPOSITORY from 'storages/ProjectRepository'
import PersonRepository from 'storages/PersonRepository'

// help & documentation in BaseDetailDialog
const ENTITY = detailTypes.PROJECT
const ENTITY_NAME = 'project'

class ProjectDetailDialog extends BaseDetailDialog {
  repository = REPOSITORY
  entity = ENTITY

  getFormDefinitons(state, props) {
    return [
      {name: 'name', type: 'text', label: 'Název', required: true},
      {name: 'status', type: 'select', label: 'Stav', options: ::this.getStatusSelection(), defaultValue: 'ACTIVE', required: true},
      {name: 'description', fullwidth: true, type: 'text', label: 'Popis', required: false},
      {name: 'projManagerId', type: 'select', label: 'Projektový manažer', options: ::this.getPeopleSelection(), required: true},
      {name: 'portfolioManagerId', type: 'select', label: 'Portfoliový manažer', options: ::this.getPeopleSelection(), required: true},
      {name: 'startDate', type: 'date', format: 'D. M. YYYY', label: 'Začátek', required: false},
      {name: 'endDate', type: 'date', format: 'D. M. YYYY', label: 'Konec', required: false}
    ]
  }

  getTabs(state, props) {
    return {
      'Informace': DetailDialogForm,
      'Účastníci projektu': ProjectParticipants,
      'Matice RASCI': ProjectMatrix
    }
  }

  getPeopleSelection() {
    const people = PersonRepository.get()
    if (!people || !people.length) return []
    let selection = people.map(val => ({
      value: val.id,
      label: getFullName(val) + ` (${val.login})`
    }))
    return selection
  }

  getStatusSelection() {
    return Object.keys(projectStates).map(state => ({
      value: state,
      label: projectStates[state]
    }))
  }
}

const mapStateToProps = (state) => {
  return assign(getBaseStateToPropsMappings(state), {
    title: state.main.detailDialogAction === detailActions.CREATE ? 'Nový projekt' : 'Detail projektu',
    open: state.main.detailDialogOpen === ENTITY,
    loading: state.dataSyncing[ENTITY_NAME]
  })
}

export default connect(
  mapStateToProps,
  createMapDispatchToProps(ProjectDetailDialog)
)(ContainedComponent)
