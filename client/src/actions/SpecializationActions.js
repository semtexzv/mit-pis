import {NAME} from "../constants/SpecializationConstants";

export const FILL_SPEC = `${NAME}/FILL_SPEC`;
export const SPEC_CHANGE = `${NAME}/SPEC_CHANGE`;
export const UPDATE_DROPDOWN = `${NAME}/UPDATE_DROPDOWN`;
export const SAVE_SPEC = `${NAME}/SAVE_SPEC`;
export const SHOW_WARNING = `${NAME}/SHOW_WARNING`;
export const HIDE_WARNING = `${NAME}/HIDE_WARNING`;

export const fillSpec = (value) => ({
  type: FILL_SPEC,
});

export const updateSpec = (value) => ({
  type: SPEC_CHANGE,
  value: value
});

export const updateDropdown = (value) => ({
  type: UPDATE_DROPDOWN,
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
