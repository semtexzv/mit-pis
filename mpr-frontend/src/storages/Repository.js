import loki from 'lokijs'
import { store } from 'App'
import rest from 'api/rest'
import { dataUpdated } from 'actions/DataUpdatedActions'
import {showError, convertCamelCaseToURL} from 'lib/tools'
import assign from 'lodash/assign'

/**
 * default class for item storing (repository-like)
 * @class Storage
 */
export default class Repository {
  loki = null
  db = null
  waiting = false
  downloaded = false

  // to work with minification
  getClassName() {
    return 'Repository'
  }

  getActionName() {
    let action = convertCamelCaseToURL(this.getClassName() // have to be explicit, because of minification
      .replace('Repository', '')) // remove repository appendix
    action = action.charAt(0).toLowerCase() + action.slice(1)
    return action
  }

  constructor() {
    this.loki = new loki(this.getClassName() + '.json')
    this.db = this.loki.addCollection(this.getClassName())
    this.actionName = this.getActionName()
    this.restAction = rest.actions[this.actionName]
  }

  getStore() {
    return store
  }

  getById(id) {
    return this.getOne({id: parseInt(id)}, null)
  }

  getOne(args, def = false) {
    const item = this.db.findOne(args)
    if (!item) {
      this.triggerDownload()
      return def
    } else return item
  }

  get(cond = null, sort = null, sortDesc = false) {
    const result = (sort ? this.db.chain().find(cond).simplesort(sort, sortDesc) : this.db.chain().find(cond)).data({forceClones: true})
    if (!result || !result.length) {
      this.triggerDownload()
    }
    return result
  }

  getDetail(id) {
    const data = this.getById(id)
    if (!data || data._incomplete) {
      this.refreshItem(id)
    }
    return data
  }

  delete(id, callback = null) {
    this.massDelete([id], callback)
  }

  massDelete(idList, callback = null) {
    const id = idList.join()
    if (!id) return
    const removeItems = ::this.removeItems
    store.dispatch(this.restAction.delete({id}, {}, (err, result) => {
      if (!err && result && !result._error) {
        removeItems(idList) // local update
        store.dispatch(dataUpdated())
        if (typeof callback === 'function') callback(result)
      } else {
        const err = result._error ? result._error : err
        console.error('ERROR in Repository->massDelete', err)
        const msg = err.error ? err.error.message : 'Došlo k chybě při mazání dat, zkuste akci opakovat později'
        showError(msg)
      }
    }))
  }

  update(id, data, dataForApi = null, callback = null) {
    id = +id
    if (!dataForApi) dataForApi = assign({}, data)
    const saveItem = ::this.saveItem
    store.dispatch(this.restAction.post({id}, {body: JSON.stringify(dataForApi)}, function (err, result) {
      if (!err && result && !result._error) {
        // const item = result.data._incomplete === false ? result.data : data
        // assume only detail is returned from update
        const item = {...result.data, _incomplete: false}
        saveItem(item)
        store.dispatch(dataUpdated())
        if (typeof callback === 'function') callback(result)
      } else {
        const err = result._error ? result._error : err
        console.error('ERROR in Repository->update', err)
        const msg = err.error ? err.error.message : 'Chyba při aktualizaci dat'
        showError(msg)
      }
    }))
  }

  insert(data, callback = null) {
    store.dispatch(this.restAction.post({}, {body: JSON.stringify(data)}, (err, result) => {
      if (!err && result && !result._error && result.data) {
        this.db.insert(result.data)
        store.dispatch(dataUpdated())
        if (typeof callback === 'function') callback(result)
      } else {
        const err = result._error ? result._error : err
        console.error('ERROR in Repository->insert', err)
        const msg = err.error ? err.error.message : 'Došlo k chybě při vkládání dat, zkuste akci opakovat později'
        showError(msg)
      }
    }))
  }

  saveData(data) {
    if (!data) return
    this.db.clear()
    data.map((item, index) => {
      if (!this.db.findOne({ id: item.id })) {
        this.db.insert(item)
      }
    })
  }

  setDownloaded() {
    this.downloaded = true
  }

  triggerDownload(id = null) {
    if (!this.downloaded) {
      this.downloadData(id)
    }
  }

  downloadData(id = null) {
    if (this.waiting) return
    this.waiting = true
    // some sort of a bug in redux API... when I use timeOut its ok
    const param = (id === null) ? {} : {id}
    const _incomplete = id === null
    const setDownloaded = ::this.setDownloaded
    setTimeout(() =>
      store.dispatch(this.restAction.get(param, {}, (err, result) => {
        setDownloaded()
        if (!err && result && result.data) {
        ::this.saveData(result.data.map(i => ({...i, _incomplete})))
        store.dispatch(dataUpdated())
        } else {
          err = err || result._error
          console.error(err)
          if (!err || !err.error || +err.error.code !== 401) showError('Chyba při stahování dat')
        }
        this.waiting = false
      }))
      , 1)
  }

  saveItem(item) {
    if (!this.db.findOne({ id: item.id })) {
      this.db.insert(item)
    } else {
      let oldItem = this.db.findOne({ id: item.id })
      item = assign(oldItem, item)
      this.db.update(item)
    }
  }

  removeItems(idList) {
    const resultset = this.db.chain().find({'id': {'$in': idList}}).data()
    if (resultset) {
      this.db.remove(resultset)
    }
  }

  refreshItem(id = null, callDataUpdated = true) {
    const param = (id === null) ? {} : {id}
    const saveItem = ::this.saveItem
    setTimeout(() =>
      store.dispatch(this.restAction.get(param, {}, (err, result) => {
        if (!err && result && result.data && !result._error) {
          // assume only complete items are returned
          let item = {...result.data, _incomplete: false}
          saveItem(item)
          if (callDataUpdated) store.dispatch(dataUpdated())
        } else {
          console.error(err)
        }
      }))
      , 1)
  }

  clear() {
    this.db.clear()
    this.downloaded = false
  }
}
