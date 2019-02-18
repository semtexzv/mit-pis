import types from './ActionTypes'

export function updateProfileData(data) {
  return {
    type: types.UPDATE_PROFILE_DATA,
    data: data
  }
}
