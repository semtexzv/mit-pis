import { connect } from 'react-redux'
import ContainedComponent from 'components/lists/List'
import assign from 'lodash/assign'
import {detailTypes} from 'config'
// import activeRenderer from 'components/helpers/listValueRenderers/active'
import { BaseList, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseList'
import DETAIL_DIALOG from 'containers/details/QualificationDetailDialog'
import REPOSITORY from 'storages/QualificationRepository'

// help & documentation in BaseList
const ENTITY = detailTypes.QUALIFICATION
const ENTITY_NAME = 'qualification'
const TITLE = 'Seznam kvalifikací'

class ListDispatchToProps extends BaseList {
  repository = REPOSITORY
  entity = ENTITY
  detailDialog = DETAIL_DIALOG

  getColumnData(state, props) {
    return [
      {name: 'id', numeric: false, padding: 'none', label: 'ID'},
      {name: 'name', numeric: false, padding: 'none', label: 'Název'},
      {name: 'description', numeric: false, padding: 'none', label: 'Popis'},
      {name: 'lastModified', numeric: false, timeAgo: true, padding: 'dense', label: 'Poslední úprava'}
      // {name: 'active', numeric: false, padding: 'none', label: 'Aktivní', renderer: activeRenderer}
    ]
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
