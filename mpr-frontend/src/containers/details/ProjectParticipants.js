import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialogItemPicker'
import DetailDialogProjectParticipantPickerItem from 'containers/details/DetailDialogProjectParticipantPickerItem'
import PersonRepository from 'storages/PersonRepository'
import { getFullName } from 'helpers'

const mapStateToProps = (state, ownProps) => {
  return {
    selectLabel: 'Zvolte účastníka',
    formValueKey: 'participants',
    customItemComponent: DetailDialogProjectParticipantPickerItem,
    uniqueIDs: true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOptions(formValues) {
      const items = PersonRepository.get()
      if (!items || !items.length) return []
      const selection = items.map(item => {
        const {id} = item
        return {
          value: {id, roleIds: []},
          label: getFullName(item) + ` (${item.login})`
        }
      })
      return selection
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
