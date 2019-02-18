import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialog'
import assign from 'lodash/assign'
import {detailTypes} from 'config'
import {detailActions} from 'definitions'
import { BaseDetailDialog, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseDetailDialog'
import DetailDialogForm from 'components/details/DetailDialogForm'
import RoleRequirements from './RoleRequirements'
import REPOSITORY from 'storages/RoleRepository'
import ProjectRepository from 'storages/ProjectRepository'

// help & documentation in BaseDetailDialog
const ENTITY = detailTypes.ROLE
const ENTITY_NAME = 'role'

class RoleDetailDialog extends BaseDetailDialog {
  repository = REPOSITORY
  entity = ENTITY

  getFormDefinitons(state, props) {
    return [
      {name: 'name', type: 'text', label: 'Název', required: true},
      {name: 'description', type: 'text', label: 'Popis', required: false},
      {name: 'projectId', type: 'select', label: 'Projekt', options: ::this.getProjectSelection(), required: true}
    ]
  }

  getTabs(state, props) {
    return {
      'Informace': DetailDialogForm,
      'Požadované kvalifikace': RoleRequirements
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
}

const mapStateToProps = (state) => {
  return assign(getBaseStateToPropsMappings(state), {
    title: state.main.detailDialogAction === detailActions.CREATE ? 'Nová role' : 'Detail role',
    open: state.main.detailDialogOpen === ENTITY,
    loading: state.dataSyncing[ENTITY_NAME]
  })
}

export default connect(
  mapStateToProps,
  createMapDispatchToProps(RoleDetailDialog)
)(ContainedComponent)
