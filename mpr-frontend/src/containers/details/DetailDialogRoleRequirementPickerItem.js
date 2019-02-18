import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialogRoleRequirementPickerItem'
import QualificationRepository from 'storages/QualificationRepository'

const mapStateToProps = (state) => {
  return {
    language: state.main.language,
    dataVersion: state.main.dataVersion
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQualification: (id) => {
      return QualificationRepository.getById(id)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
