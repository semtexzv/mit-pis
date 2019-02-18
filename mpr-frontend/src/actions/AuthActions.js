import types from './ActionTypes'

export function auth(token) {
  return {
    type: types.USER_AUTHORIZED,
    token
  }
}

export function unAuth() {
  return {
    type: types.USER_UNAUTHORIZED
  }
}
