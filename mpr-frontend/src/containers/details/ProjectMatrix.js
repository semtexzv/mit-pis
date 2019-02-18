import { connect } from 'react-redux'
import ContainedComponent from 'components/details/DetailDialogMatrix'
import MatrixRepository from 'storages/MatrixRepository'
import ProjectRepository from 'storages/ProjectRepository'
import PersonRepository from 'storages/PersonRepository'
import WorkUnitRepository from 'storages/WorkUnitRepository'
import RoleRepository from 'storages/RoleRepository'

const mapStateToProps = (state) => {
  return {
    loading: state.dataSyncing.matrix
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMatrix: (props) => {
      const {id} = props.formValues
      if (!id) return {}
      return MatrixRepository.getDetail(props.formValues.id)
    },
    updateMatrix: (props, matrix) => {
      const {id} = props.formValues
      if (!id) return {}
      return MatrixRepository.update(id, matrix)
    },
    getProjectParticipants: (props) => {
      const {id} = props.formValues
      if (!id) return []
      const project = ProjectRepository.getById(id)
      return project.participants
    },
    getProjectWorkUnits: (props) => {
      const {id} = props.formValues
      if (!id) return []
      let workUnits = WorkUnitRepository.get({projId: id})
      workUnits = workUnits.sort((w1, w2) => {
        const s1 = (+w1.sortOrder || 999)
        const s2 = (+w2.sortOrder || 999)
        return s1 - s2
      })
      return workUnits
    },
    getPerson: (id) => {
      return PersonRepository.getById(id)
    },
    getRole: (id) => {
      return RoleRepository.getById(id)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainedComponent)
