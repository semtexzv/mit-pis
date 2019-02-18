import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialogItemPicker'
import DetailDialogRoleRequirementPickerItem from 'containers/details/DetailDialogRoleRequirementPickerItem'
import QualificationRepository from 'storages/QualificationRepository'

const mapStateToProps = (state) => {
  return {
    selectLabel: 'Zvolte požadavek',
    formValueKey: 'requirements',
    customItemComponent: DetailDialogRoleRequirementPickerItem,
    uniqueIDs: true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOptions(formValues) {
      const items = QualificationRepository.get()
      if (!items || !items.length) return [{value: {id: null, level: 1}, label: 'Načítám ...'}]
      let selection = items.map(item => {
        const {id, name} = item
        return {
          value: {id, level: 1},
          label: name
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
