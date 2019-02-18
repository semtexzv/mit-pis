/**
* It is kinda weird here, but in short:
* - development will have action types named (for console)
* - production will use integers (faster comparsion and no console display)
* - all the hard work is up to webpack (see webpack-strip-block loader)
* - eslint is okay with it
*/

const actionTypes = {
  // data
  DATA_UPDATED: 1,
  // main
  SET_TOKEN: 100,
  SET_FULLSCREEN: 101,
  DOCK_MENUBAR: 102,
  UNDOCK_MENUBAR: 103,
  OPEN_MENUBAR: 104,
  CLOSE_MENUBAR: 105,
  SHOW_DETAIL_DIALOG: 106,
  DISMISS_DETAIL_DIALOG: 107,
  SHOW_DELETE_DIALOG: 108,
  DISMISS_DELETE_DIALOG: 109,
  SET_FRONTEND_LANGUAGE: 110,
  // profile & auth
  USER_AUTHORIZED: 200,
  USER_UNAUTHORIZED: 201,
  UPDATE_PROFILE_DATA: 202
}

export default
/* DEV */Object.keys(/* /DEV */actionTypes/* DEV */).reduce(
  (res, val) => {
    res[val] = val
    return res
  }, {})
/* /DEV */
