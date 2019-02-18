import assign from 'lodash/assign'
import rest from 'api/rest'

/**
* This reducer watches all rest actions and produces an object like
* {action1: false, action2: false, activeAction3: true, ...}
* so you can read current syncing state anywhere like state.dataSyncing.YOUR_ACTION
*/

const allHandles = Object.keys(rest.actions)
const initialState = allHandles.reduce(
  (res, val) => {
    res[val] = false
    return res
  }, {})

export default function dataSyncing(state = initialState, action) {
  if (typeof action.type !== 'string' || action.type.indexOf('@@redux-api@') !== 0) return state
  const match = action.type.match(/^@@redux-api@(.*?)(_(?:success|fail))?$/)
  const handle = match[1]
  if (allHandles.indexOf(handle) >= 0) {
    const syncing = typeof match[2] === 'undefined'
    return assign({}, state, {[handle]: syncing})
  } else {
    return state
  }
}
