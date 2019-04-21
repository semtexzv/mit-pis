import {NAME} from "../constants/EmployeeConstants";

export const TOGGLE_DISPLAY_DIALOG = `${NAME}/TOGGLE_DISPLAY_DIALOG`;
export const DELETE_ROW = `${NAME}/DELETE_ROW`;
export const SAVE_ROW = `${NAME}/SAVE_ROW`;
export const UPDATE_NAME = `${NAME}/UPDATE_NAME`;
export const UPDATE_SURNAME = `${NAME}/UPDATE_SURNAME`;
export const UPDATE_ROLE = `${NAME}/UPDATE_ROLE`;
export const UPDATE_PASSWORD_OLD = `${NAME}/UPDATE_PASSWORD_OLD`;
export const UPDATE_PASSWORD_NEW = `${NAME}/UPDATE_PASSWORD_NEW`;
export const UPDATE_PASSWORD_CHECK = `${NAME}/UPDATE_PASSWORD_CHECK`;
export const UPDATE_SELECTED_ROW = `${NAME}/UPDATE_SELECTED_ROW`;

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

export const updatePasswordOld = (value) => ({
  type: UPDATE_PASSWORD_OLD,
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

export const toggleDisplayDialog = () => ({
  type: TOGGLE_DISPLAY_DIALOG,
});

export const deleteRow = () => ({
  type: DELETE_ROW,
});

export const saveRow = () => ({
  type: SAVE_ROW,
});

export const updateSelectedRow = (data) => ({
  type: UPDATE_SELECTED_ROW,
  value: data,
});

