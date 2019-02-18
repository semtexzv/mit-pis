import { connect } from 'react-redux'
import ContainedComponent from 'components/pages/Dashboard'
import ProjectRepository from 'storages/ProjectRepository'
import PersonRepository from 'storages/PersonRepository'

const mapStateToProps = (state) => {
  return {
    dataVersion: state.main.dataVersion,
    loggedUserId: state.profile.id,
    personLoading: state.dataSyncing.person,
    projectLoading: state.dataSyncing.project
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => ProjectRepository.get(),
    getPeople: () => PersonRepository.get(),
    getPerson: id => PersonRepository.getById(id)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
