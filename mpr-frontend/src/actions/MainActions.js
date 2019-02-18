import types from './ActionTypes'

export function setToken(token) {
  return {
    type: types.SET_TOKEN,
    token
  }
}

export function setFrontendLanguage(lang) {
  return {
    type: types.SET_FRONTEND_LANGUAGE,
    lang
  }
}

export function setFullscreen(fullscreen) {
  return {
    type: types.SET_FULLSCREEN,
    fullscreen
  }
}

export function dockMenubar() {
  return {
    type: types.DOCK_MENUBAR
  }
}

export function undockMenubar() {
  return {
    type: types.UNDOCK_MENUBAR
  }
}

export function openMenubar() {
  return {
    type: types.OPEN_MENUBAR
  }
}

export function closeMenubar() {
  return {
    type: types.CLOSE_MENUBAR
  }
}

export function showDetailDialog(entity, detailAction, id) {
  return {
    type: types.SHOW_DETAIL_DIALOG,
    entity,
    detailAction,
    id
  }
}

export function dismissDetailDialog() {
  return {
    type: types.DISMISS_DETAIL_DIALOG
  }
}

export function showDeleteDialog(entity, idList) {
  return {
    type: types.SHOW_DELETE_DIALOG,
    entity,
    idList
  }
}

export function dismissDeleteDialog() {
  return {
    type: types.DISMISS_DELETE_DIALOG
  }
}
