import types from 'actions/ActionTypes'
import assign from 'lodash/assign'

const initialState = {
  id: null
}

export default function profile(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_PROFILE_DATA:
      return assign({}, state, action.data)

    case types.USER_UNAUTHORIZED:
      return assign({}, initialState)

    default:
      return state
  }
}
