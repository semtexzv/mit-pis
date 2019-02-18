import rest from 'api/rest'
import { unAuth } from './AuthActions'
import { updateProfileData } from './ProfileActions'
import * as tools from 'lib/tools'

export function loadProfileData(callback = null) {
  // TMP fake data
  // return (dispatch, getState) => {
  //   setTimeout(() => {
  //     dispatch(updateProfileData({id: 1}))
  //     callback({id: 1})
  //   }, 100)
  // }

  return (dispatch, getState) => {
    // TODO: cache loading data from api
    dispatch(rest.actions.me.get({}, {}, function (err, result, status) {
      if (err || !result.data) {
        tools.showError('Načtení profilu se nezdařilo')
        dispatch(unAuth())
      } else if (result.data) {
        dispatch(updateProfileData(result.data))
        if (callback && typeof callback === 'function') {
          callback(result.data)
        }
      }
    }))
  }
}
