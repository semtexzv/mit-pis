import Repository from './Repository'
// import * as tools from 'lib/tools'

/**
 * @class RoleRepository
 */
class RoleRepository extends Repository {
  getClassName() {
    return 'RoleRepository'
  }
}

const instance = new RoleRepository()
export default instance
