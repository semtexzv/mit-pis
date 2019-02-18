import Repository from './Repository'
// import * as tools from 'lib/tools'

/**
 * @class QualificationRepository
 */
class QualificationRepository extends Repository {
  getClassName() {
    return 'QualificationRepository'
  }
}

const instance = new QualificationRepository()
export default instance
