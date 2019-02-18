import {detailTypes} from 'config'
import {detailActions} from 'definitions'
import {extractObjectMethods, sortArrayData} from 'lib/tools'
import {showDetailDialog, showDeleteDialog, dismissDeleteDialog} from 'actions/MainActions'

const ENTITY = detailTypes.NONE
const REPOSITORY = null
const DETAIL_DIALOG = null

/**
* HOW TO
* 1. extend BaseList in your container, eg. PageList
* 2. override functions, at least getColumnData
* 3. import getBaseStateToPropsMappings and add your own mappings
* 4. import createMapDispatchToProps and use it to connect your class as mapDispatchToProps
* examples below
*/

export class BaseList {
  repository = REPOSITORY
  entity = ENTITY
  detailDialog = DETAIL_DIALOG
  dispatch = null // filled before connect

  /**
  mandatory: id (id/string), label (string), numeric (bool), padding (string enum: none, dense, checkbox, default)
  other: datetime (string for moment.js), timeAgo (bool), maxLength (int)
  */
  getColumnData(state, props) {
    return [
      {name: 'title', numeric: false, padding: 'none', label: 'Titulek'},
      {name: 'route', numeric: false, padding: 'none', label: 'Cesta'},
      {name: 'authorName', numeric: false, padding: 'none', label: 'Autor'},
      {name: 'lastModified', numeric: false, timeAgo: true, padding: 'none', label: 'Poslední úprava'}
    ]
  }

  /**
  return an array of object with keys according to getColumnData
  */
  getData(state, props) {
    let data = this.getDataset(state, props)
    data = this.filterData(data, state, props)
    data = this.sortData(data, state, props)
    return data
  }

  /**
  * gets base dataset for getData
  */
  getDataset(state, props) {
    return this.repository.get().slice()
  }

  /**
  * filters data from getData()
  */
  filterData(data, state, props) {
    const { filter } = state
    if (filter) {
      let filteredView = []
      let contains = false
      let re = new RegExp(filter, 'i')
      data.forEach(item => {
        for (let key in item) {
          if (key === '$loki' || key === 'meta' || !item[key]) continue
          if (typeof item[key].search === 'function') {
            contains = item[key].search(re) > -1
          } else if (typeof item[key] === 'number') {
            contains = item[key] === +filter
          } else continue
          if (contains) {
            filteredView.push(item)
            break
          }
        }
      })
      return filteredView
    } else return data
  }

  /**
  * sorts data from getData()
  */
  sortData(data, state, props) {
    if (state.orderBy) {
      data = sortArrayData(data, state.orderBy, state.order)
    }
    return data
  }

  getDetailAction(state, props) {
    return (e, item) => {
      this.dispatch(showDetailDialog(this.entity, detailActions.EDIT, item.id))
    }
  }

  getAddAction(state, props) {
    return (e, item) => {
      this.dispatch(showDetailDialog(this.entity, detailActions.CREATE, 0))
    }
  }

  // on trash icon click
  getDeleteAction(state, props) {
    return (e) => {
      const idList = state.selected
      this.dispatch(showDeleteDialog(this.entity, idList))
    }
  }

  // on Confirm Button in delete confirmation dialog
  confirmDelete(dialogState, dialogProps, listCallback = null) {
    const callback = (res) => {
      this.dispatch(dismissDeleteDialog())
      if (typeof listCallback === 'function') listCallback(res)
    }
    this.repository.massDelete(dialogProps.idList, callback)
  }

  getDetailDialog() {
    return this.detailDialog
  }

  getExtraFooterContent(state, props) {
    return null
  }

  getExtraFilters(state, props, setState, data) {
    return null
  }
}

// example mapStateToProps
// const mapStateToProps = (state) => {
//   return assign(getBaseStateToPropsMappings(state), {
//     title: 'Seznam stránek na webu',
//     deleteInProgress: state.dataSyncing.page,
//   })
// }

export function getBaseStateToPropsMappings(state) {
  return {
    language: state.main.frontendLanguage,
    deleteDialogOpen: state.main.deleteDialogOpen !== detailTypes.NONE,
    dataVersion: state.main.dataVersion,
    defaultOrderBy: 'id',
    defaultOrderByTrend: 'desc'
  }
}

export function createMapDispatchToProps(className) {
  const mapDispatchToProps = (dispatch) => {
    const instance = new className()
    instance.dispatch = dispatch
    const mappings = extractObjectMethods(instance)
    return mappings
  }
  return mapDispatchToProps
}

// example how to write connect
// export default connect(
//   mapStateToProps,
//   createMapDispatchToProps(BaseList)
// )(List)
