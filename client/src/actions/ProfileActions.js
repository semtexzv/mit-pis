import {NAME} from "../constants/ProfileConstants";

export const UPDATE_NAME = `${NAME}/UPDATE_NAME`;
export const UPDATE_SURNAME = `${NAME}/UPDATE_SURNAME`;
export const UPDATE_PASSWORD_NEW = `${NAME}/UPDATE_PASSWORD_NEW`;
export const UPDATE_PASSWORD_CHECK = `${NAME}/UPDATE_PASSWORD_CHECK`;
export const SET_CHANGE_PASSWORD = `${NAME}/SET_CHANGE_PASSWORD`;
export const UNSET_CHANGE_PASSWORD = `${NAME}/UNSET_CHANGE_PASSWORD`;
export const UPDATE_USER_ID = `${NAME}/UPDATE_USER_ID`;
export const UPDATE_USER_NAME = `${NAME}/UPDATE_USER_NAME`;
export const NOTHING = `${NAME}/NOTHING`;
export const SAVE_PROFILE = `${NAME}/SAVE_PROFILE`;


export const updateName = (value) => ({
  type: UPDATE_NAME,
  value: value
});

export const updateSurname = (value) => ({
  type: UPDATE_SURNAME,
  value: value
});

export const updateUserName = (value) => ({
  type: UPDATE_USER_NAME,
  value: value
});

export const updatePasswordNew = (value) => ({
  type: UPDATE_PASSWORD_NEW,
  value: value
});

export const updatePasswordCheck = (value) => ({
  type: UPDATE_PASSWORD_CHECK,
  value: value
});

export const setChangePassword = () => ({
  type: SET_CHANGE_PASSWORD,
});

export const unsetChangePassword = () => ({
  type: UNSET_CHANGE_PASSWORD,
});

export const updateUserId = (value) => ({
  type: UPDATE_USER_ID,
  value: value
});

export const doNothingProfile = () => ({
  type: NOTHING
})

export const saveProfile = () => ({
  type: SAVE_PROFILE,
});
