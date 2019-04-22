import {NAME} from "../constants/ProfileConstants";

export const UPDATE_NAME = `${NAME}/UPDATE_NAME`;
export const UPDATE_SURNAME = `${NAME}/UPDATE_SURNAME`;
export const UPDATE_ROLE = `${NAME}/UPDATE_ROLE`;
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

export const updateRole = (value) => ({
  type: UPDATE_ROLE,
  value: value
});

export const updateUserName = (value) => ({
  type: UPDATE_USER_NAME,
  value: value
});

export const updateUserId = (value) => ({
  type: UPDATE_USER_ID,
  value: value
});

export const doNothingProfile = () => ({
  type: NOTHING
})



export const saveProfile = (username, name, surname, role) => ({
  type: SAVE_PROFILE,
  username : username,
  name : name,
  surname : surname,
  sysRole : role
});
