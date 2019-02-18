import 'isomorphic-fetch'
import reduxApi from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import { API_ENDPOINT, ENABLE_PROXY } from 'config'
// for handling token expiration
import { convertCamelCaseToURL, showError } from 'lib/tools'
import { unAuth } from 'actions/AuthActions'
import { store } from 'App'

if (window.location.hostname !== 'localhost' && ENABLE_PROXY) {
  var API_PROXY_URL = '//' + window.location.hostname + '/proxy.php'
}

const crudEndpoints = ['login', 'me', 'user', 'person', 'project', 'qualification', 'work-unit', 'role', 'matrix']
const definitions = crudEndpoints.reduce(
  (res, val) => {
    res[val] = {
      url: API_ENDPOINT + convertCamelCaseToURL(val) + '/:id',
      crud: true
    }
    return res
  }, {})

export default reduxApi(definitions)
  .use('fetch', (url, options) => {
  // PROXY
    if (typeof API_PROXY_URL !== 'undefined' && API_PROXY_URL) {
      options.headers['X-Proxy-URL'] = url
      url = API_PROXY_URL
    }
    return adapterFetch(fetch)(url, options)
  })
  .use('options', (url, params, getState) => {
    const token = getState().auth.token
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': token
    }
    return { headers }
  })
  .use('responseHandler', (err, data) => {
    if (err && err.status && err.status === 401) {
      showError('Vaše sezení vypršelo, přihlaste se prosím znovu')
      store.dispatch(unAuth())
    }
    return {data, _error: err} // hack for buggy redux-api (no error in regular handler)
  })
