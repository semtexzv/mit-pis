import Repository from './Repository'
// import * as tools from 'lib/tools'

/**
 * @class PersonRepository
 */
class PersonRepository extends Repository {
  getClassName() {
    return 'PersonRepository'
  }
}

const instance = new PersonRepository()
export default instance
