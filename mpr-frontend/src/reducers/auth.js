import types from 'actions/ActionTypes'
import assign from 'lodash/assign'
import * as tools from '../lib/tools'
const initialState = {}

export default function authReducer(state = initialState, action) {
  if (action.type === types.USER_AUTHORIZED) {
    return assign({}, state, { token: action.token })
  }

  if (action.type === types.USER_UNAUTHORIZED) {
    tools.deleteCookie('AuthToken')
    return {}
  }

  return state
}
