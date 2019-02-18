import Repository from './Repository'
// import * as tools from 'lib/tools'

/**
 * @class UserRepository
 */
class UserRepository extends Repository {
  getClassName() {
    return 'UserRepository'
  }
}

const instance = new UserRepository()
export default instance
