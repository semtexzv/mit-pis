import Repository from './Repository'
// import * as tools from 'lib/tools'

/**
 * @class WorkUnitRepository
 */
class WorkUnitRepository extends Repository {
  getClassName() {
    return 'WorkUnitRepository'
  }
}

const instance = new WorkUnitRepository()
export default instance
