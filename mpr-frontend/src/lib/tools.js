import Alert from 'react-s-alert'
import assign from 'lodash/assign'
import orderBy from 'lodash/orderBy'

/**
 * Sets a cookie
 * @method setCookie
 * @param  {string}  name              Name of cookie to set
 * @param  {*}  value             Value to set to cookie. Must have .toString() method
 * @param  {number}  expirationMinutes Non-negative number of minutes after which the cookie expires
 */
export function setCookie(name, value, expirationMinutes) {
  let d = new Date()
  d.setTime(d.getTime() + (expirationMinutes * 60 * 1000))
  let expires = 'expires=' + d.toUTCString()
  document.cookie = name + '=' + value + '; ' + expires + '; path=/'
}

/**
 * Deletes a cookie
 * @method deleteCookie
 * @param  {string}     name Name of cookie to delete
 */
export function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/'
}

/**
 * Returns a cookie
 * @method getCookie
 * @param  {string}  name Name of cookie to get
 * @return {string}       Cookie value
 */
export function getCookie(name) {
  name += '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const alertDefaultConfig = { position: 'bottom-right', effect: 'slide' }

/**
* Shows error notification to the user
*/
export function showError(msg, config = {}) {
  config = assign(alertDefaultConfig, config || {})
  Alert.error(msg, config)
}
/**
* Shows warning notification to the user
*/
export function showWarning(msg, config = {}) {
  config = assign(alertDefaultConfig, config || {})
  Alert.warning(msg, config)
}
/**
* Shows information notification to the user
*/
export function showInfo(msg, config = {}) {
  config = assign(alertDefaultConfig, config || {})
  Alert.info(msg, config)
}
/**
* Shows sucess notification to the user
*/
export function showSuccess(msg, config = {}) {
  config = assign(alertDefaultConfig, config || {})
  Alert.success(msg, config)
}

/**
* Retrieves total offset of an element in the DOM structure
*
* @function getOffset
* @param {Node} el Element
*/
export function getOffset(el) {
  var _x = 0
  var _y = 0
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft
    _y += el.offsetTop - el.scrollTop
    el = el.offsetParent
  }
  return { top: _y, left: _x }
}

/**
* Extracts a variable value from a (URL) string.
*
* @param {String} name Name of the variable.
* @param {String} Value of the variable.
*/
export function getHashVar(name) {
  const re = new RegExp('.*' + name + '=([^#/,]*).*', 'i')
  const result = window.location.hash.replace(re, '$1')
  return result
}

/**
* Extracts a variable value from a (URL) string. Returns NULL if no match, TRUE if match with no value and no '=', otherwise the value as a string (so '' is a match too!)
*
* @param {String} name Name of the variable.
* @param {String} Value of the variable.
*/
export function getQueryVar(name) {
  const re = new RegExp('.*?[?&]' + name + '(=|&|$|#)(.*?)($|&|#)', 'i')
  const result = window.location.href.match(re)
  if (!result || !result.length || !result[0]) return null // no match
  if (result[1] !== '=') return true // matched, but name is followed by another pattern, so no value supplied
  return result[2] // matched, has '=', so return what is after it, even when its ''
}

/**
* Validate whether is email address correct
* @param {String} The email address
*/
export function validateEmailAddress(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
* Capitalizes first letter of a given string
* @param {String} The string
*/
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
* CConverts camelCase to hyphens (camel-case)
* @param {String} The string
*/
export function convertCamelCaseToURL(string) {
  return string.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() })
}

/**
* Changes a window title so that it goes "NEWTITLE | WEBSITE NAME". Website name is parsed from previous title.
* @param {String} Title
*/
export function setWindowTitlePart(title) {
  const newTitle = title + ' | ' + document.title.replace(/.*\|\s*/, '')
  document.title = newTitle
}

/**
* Sorts an array of data, MUTATES the original array, if not desired, supply array.slice()
* @param {Array} data
* @param {String} column
* @param {String} order
*/
export function sortArrayData(data, column, order = 'asc') {
  return orderBy(data, [column], [order])
}

/**
* Returns an array of class methods
* @param {String} className
*/
export function getClassMethodNames(className) {
  if (!(className instanceof Object)) {
    throw new Error('Not a class')
  }
  const defaultMethods = ['constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'propertyIsEnumerable', 'valueOf', 'toString', 'toLocaleString', 'isPrototypeOf']
  let ret = new Set()

  function methods(obj) {
    if (obj) {
      let ps = Object.getOwnPropertyNames(obj)
      ps.forEach(p => {
        if (obj[p] instanceof Function && defaultMethods.indexOf(p) < 0) {
          ret.add(p)
        }
      })
      methods(Object.getPrototypeOf(obj))
    }
  }
  methods(className.prototype)
  return Array.from(ret)
}

/**
* Returns an object of given instance's methods
* @param {Object} object
*/
export function extractObjectMethods(object) {
  const methodNames = getClassMethodNames(object.constructor)
  return methodNames.reduce(
    (res, val) => {
      res[val] = object[val].bind(object)
      return res
    }, {})
}
