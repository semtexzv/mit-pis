import types from 'actions/ActionTypes'
import assign from 'lodash/assign'
import cloneDeep from 'lodash/cloneDeep'
import {dockedMenuBarTheshold, detailTypes, defaultFrontendLanguage} from 'config'
import {detailActions} from 'definitions'
import wipeStorage from 'storages/wipe'

const initialState = {
  fullscreen: false,
  dataVersion: 0,
  menuBarOpen: !(window.innerWidth < dockedMenuBarTheshold),
  menuBarDocked: !(window.innerWidth < dockedMenuBarTheshold),
  detailDialogOpen: detailTypes.NONE,
  detailDialogAction: detailActions.NONE,
  detailDialogId: 0,
  deleteDialogOpen: detailTypes.NONE,
  deleteDialogIdList: [],
  frontendLanguage: defaultFrontendLanguage
}

export default function main(state = initialState, action) {
  /* DEV */
  if (typeof action.type === 'string' && action.type.indexOf('@') < 0) console.log('♦ ' + action.type)
  /* /DEV */

  switch (action.type) {
    case types.SET_FRONTEND_LANGUAGE:
      return assign({}, state, {frontendLanguage: action.lang})

    case types.OPEN_MENUBAR:
      return assign({}, state, {menuBarOpen: true})
    case types.CLOSE_MENUBAR:
      return assign({}, state, {menuBarOpen: false})

    case types.DOCK_MENUBAR:
      return assign({}, state, {menuBarDocked: true})
    case types.UNDOCK_MENUBAR:
      return assign({}, state, {menuBarDocked: false})

    case types.SHOW_DETAIL_DIALOG:
      return assign({}, state, {detailDialogOpen: action.entity, detailDialogAction: action.detailAction, detailDialogId: action.id})
    case types.DISMISS_DETAIL_DIALOG:
      return assign({}, state, {detailDialogOpen: detailTypes.NONE, detailDialogAction: detailActions.NONE, detailDialogId: 0})

    case types.SHOW_DELETE_DIALOG:
      return assign({}, state, {deleteDialogOpen: action.entity, deleteDialogIdList: action.idList})
    case types.DISMISS_DELETE_DIALOG:
      return assign({}, state, {deleteDialogOpen: detailTypes.NONE, deleteDialogIdList: []})

    case types.DATA_UPDATED:
      return assign({}, state, {dataVersion: state.dataVersion + 1})

    case types.USER_UNAUTHORIZED:
      setTimeout(() => wipeStorage(), 100)
      return assign({}, cloneDeep(initialState))

    default:
      return state
  }
}
