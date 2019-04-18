import {NAME} from "../constants/SpecializationConstants";

export const SPEC_CHANGE = `${NAME}/SPEC_CHANGE`;
export const UPDATE_EMPLOYEE_NAME = `${NAME}/UPDATE_EMPLOYEE_NAME`;
export const UPDATE_EMPLOYEE_SURNAME = `${NAME}/UPDATE_EMPLOYEE_SURNAME`;
export const SAVE_SPEC = `${NAME}/SAVE_SPEC`;
export const SHOW_WARNING = `${NAME}/SHOW_WARNING`;
export const HIDE_WARNING = `${NAME}/HIDE_WARNING`;

export const updateSpec = (value) => ({
  type: SPEC_CHANGE,
  value: value
});

export const updateEmployeeName = (value) => ({
  type: UPDATE_EMPLOYEE_NAME,
  value: value
});

export const updateEmployeeSurname = (value) => ({
  type: UPDATE_EMPLOYEE_SURNAME,
  value: value
});

export const saveSpec = (value) => ({
  type: SAVE_SPEC,
});

export const showWarning = (value) => ({
  type: SHOW_WARNING,
});

export const hideWarning = (value) => ({
  type: HIDE_WARNING,
});
