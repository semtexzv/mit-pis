import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialogProjectParticipantPickerItem'
import RoleRepository from 'storages/RoleRepository'
import PersonRepository from 'storages/PersonRepository'

const mapStateToProps = (state) => {
  return {
    language: state.main.language,
    projectId: state.main.detailDialogId,
    dataVersion: state.main.dataVersion
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPerson: (id) => {
      return PersonRepository.getById(id)
    },
    getRoles: (projectId) => {
      return RoleRepository.get({projectId})
    },
    getRolesById: (projectId) => {
      return RoleRepository.get({projectId}).reduce((roles, role) => ({...roles, [role.id]: role}), {})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
