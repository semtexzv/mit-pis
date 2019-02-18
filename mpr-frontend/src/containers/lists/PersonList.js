import { connect } from 'react-redux'
import ContainedComponent from 'components/lists/List'
import assign from 'lodash/assign'
import {detailTypes} from 'config'
import {getFullName} from 'helpers'
// import activeRenderer from 'components/helpers/listValueRenderers/active'
import { BaseList, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseList'
import DETAIL_DIALOG from 'containers/details/PersonDetailDialog'
import REPOSITORY from 'storages/PersonRepository'

// help & documentation in BaseList
const ENTITY = detailTypes.PERSON
const ENTITY_NAME = 'person'
const TITLE = 'Seznam lidských zdrojů'

class ListDispatchToProps extends BaseList {
  repository = REPOSITORY
  entity = ENTITY
  detailDialog = DETAIL_DIALOG

  getColumnData(state, props) {
    return [
      {name: 'id', numeric: false, padding: 'none', label: 'ID'},
      {name: 'login', numeric: false, padding: 'none', label: 'Login'},
      {name: 'fullname', numeric: false, padding: 'none', label: 'Jméno'},
      {name: 'email', numeric: false, padding: 'none', label: 'E-mail'},
      {name: 'phone', numeric: false, padding: 'none', label: 'Telefon'},
      {name: 'lastModified', numeric: false, timeAgo: true, padding: 'dense', label: 'Poslední úprava'}
      // {name: 'active', numeric: false, padding: 'none', label: 'Aktivní', renderer: activeRenderer}
    ]
  }

  getDataset(state, props) {
    let data = this.repository.get().slice()
    for (let i in data) {
      data[i].fullname = getFullName(data[i])
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
