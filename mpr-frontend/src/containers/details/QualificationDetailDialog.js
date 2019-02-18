import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialog'
import assign from 'lodash/assign'
import {detailTypes} from 'config'
import {detailActions} from 'definitions'
import { BaseDetailDialog, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseDetailDialog'
import REPOSITORY from 'storages/QualificationRepository'

// help & documentation in BaseDetailDialog
const ENTITY = detailTypes.QUALIFICATION
const ENTITY_NAME = 'qualification'

class QualificationDetailDialog extends BaseDetailDialog {
  repository = REPOSITORY
  entity = ENTITY

  getFormDefinitons(state, props) {
    return [
      {name: 'name', type: 'text', label: 'Název', required: true},
      {name: 'description', type: 'text', label: 'Popis', fullwidth: true, required: false}
    ]
  }
}

const mapStateToProps = (state) => {
  return assign(getBaseStateToPropsMappings(state), {
    title: state.main.detailDialogAction === detailActions.CREATE ? 'Nová kvalifikace' : 'Detail kvalifikace',
    open: state.main.detailDialogOpen === ENTITY,
    loading: state.dataSyncing[ENTITY_NAME]
  })
}

export default connect(
  mapStateToProps,
  createMapDispatchToProps(QualificationDetailDialog)
)(ContainedComponent)
