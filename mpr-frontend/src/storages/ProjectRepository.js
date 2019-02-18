import Repository from './Repository'
// import * as tools from 'lib/tools'

/**
 * @class ProjectRepository
 */
class ProjectRepository extends Repository {
  getClassName() {
    return 'ProjectRepository'
  }
}

const instance = new ProjectRepository()
export default instance
