import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialog'
import assign from 'lodash/assign'
import {detailTypes} from 'config'
import {detailActions} from 'definitions'
import { BaseDetailDialog, getBaseStateToPropsMappings, createMapDispatchToProps } from './BaseDetailDialog'
import DetailDialogForm from 'components/details/DetailDialogForm'
import PersonQualifications from './PersonQualifications'
import REPOSITORY from 'storages/PersonRepository'

// help & documentation in BaseDetailDialog
const ENTITY = detailTypes.PERSON
const ENTITY_NAME = 'person'

class PersonDetailDialog extends BaseDetailDialog {
  repository = REPOSITORY
  entity = ENTITY

  getFormDefinitons(state, props) {
    return [
      {name: 'name', type: 'text', label: 'Jméno', required: true},
      {name: 'surname', type: 'text', label: 'Příjmení', required: true},
      {name: 'login', type: 'text', label: 'Login', required: true},
      {name: 'email', type: 'text', label: 'E-mail', required: true},
      {name: 'oldPassword', type: 'password', label: 'Staré heslo', helperText: 'Vyplňte, pokud chcete heslo změnit', required: false},
      {name: 'newPassword', type: 'password', label: 'Nové heslo', helperText: 'Vyplňte, pokud chcete heslo změnit', required: false},
      {name: 'phone', type: 'text', label: 'Telefon', helperText: 'Formát: 111222333', required: false},
      {name: 'street', type: 'text', label: 'Ulice', required: false},
      {name: 'houseNumber', type: 'text', label: 'Číslo popisné', required: false},
      {name: 'city', type: 'text', label: 'Město', required: false},
      {name: 'postalCode', type: 'text', label: 'PSČ', helperText: 'Formát: 111122', required: false},
      {name: 'country', type: 'text', label: 'Stát', required: false}
      // {name: 'active', type: 'checkbox', label: 'Aktivní', defaultValue: true}
    ]
  }

  getTabs(state, props) {
    return {
      'Informace': DetailDialogForm,
      'Kvalifikace': PersonQualifications
    }
  }
}

const mapStateToProps = (state) => {
  return assign(getBaseStateToPropsMappings(state), {
    title: state.main.detailDialogAction === detailActions.CREATE ? 'Nový zdroj' : 'Detail zdroje',
    open: state.main.detailDialogOpen === ENTITY,
    loading: state.dataSyncing[ENTITY_NAME]
  })
}

export default connect(
  mapStateToProps,
  createMapDispatchToProps(PersonDetailDialog)
)(ContainedComponent)
