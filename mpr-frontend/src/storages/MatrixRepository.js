import Repository from './Repository'
// import * as tools from 'lib/tools'

/**
 * @class MatrixRepository
 */
class MatrixRepository extends Repository {
  getClassName() {
    return 'MatrixRepository'
  }

  triggerDownload(id = null) {
    if (id == null) return // no generic list data
    if (!this.downloaded) {
      this.downloadData(id)
    }
  }

  downloadData(id = null) {
    return // no generic list data
  }
}

const instance = new MatrixRepository()
export default instance
