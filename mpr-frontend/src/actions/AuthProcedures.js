import rest from './../api/rest'
import { replace } from 'react-router-redux'
import { auth, unAuth } from 'actions/AuthActions'
import { loadProfileData } from 'actions/ProfileProcedures'
import { store } from 'App'
import * as tools from '../lib/tools'
import {tokenExpirationMinutes, tokenRememberExpirationMinutes} from '../config'

export function login(username, password, remember = false) {
  // TMP fake login:
  // return (dispatch, getState) => {
  //   setTimeout(() => {
  //     const token = '1234'
  //     tools.setCookie('AuthToken', token, tokenExpirationMinutes)
  //     dispatch(auth(token, false))
  //     initDataDownload()
  //   }, 100)
  // }

  return (dispatch, getState) => {
    let data = {username, password}
    if (remember) data['remember'] = true
    dispatch(rest.actions.login.post({}, {body: JSON.stringify(data)},
      (err, result, status) => {
        err = err || result._error
        if (err) {
          /* DEV */console.error('Login failure', {err, result, status})/* /DEV */
          tools.showError('Přihlášení se nezdařilo')
          dispatch(unAuth())
        } else if (result.data) {
          const {token} = result.data
          tools.setCookie('AuthToken', token, remember ? tokenRememberExpirationMinutes : tokenExpirationMinutes)
          dispatch(auth(token, remember))
          initDataDownload()
        }
      }))
  }
}

export function revalidateToken(token, action = '') {
  store.dispatch(auth(token))
  initDataDownload(true)
}

export function initDataDownload(revalidation = false) {
  store.dispatch(loadProfileData((data) => {
    const redir = tools.getQueryVar('redirect')
    if (redir) {
      store.dispatch(replace(decodeURIComponent(redir)))
    } else if (!revalidation) {
      store.dispatch(replace(decodeURIComponent('/')))
    }
  }))
}
