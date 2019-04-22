import {NAME} from "../constants/ProfileConstants";

export const UPDATE_NAME = `${NAME}/UPDATE_NAME`;
export const UPDATE_SURNAME = `${NAME}/UPDATE_SURNAME`;
export const UPDATE_ROLE = `${NAME}/UPDATE_ROLE`;
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

export const saveProfile = () => ({
  type: SAVE_PROFILE,
});
