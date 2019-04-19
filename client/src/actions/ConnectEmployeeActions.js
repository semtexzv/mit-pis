import {NAME} from "../constants/ConnectEmployeeConstants";

export const TOGGLE_DISPLAY_DIALOG = `${NAME}/TOGGLE_DISPLAY_DIALOG`;
export const UPDATE_SELECTED_ROW = `${NAME}/UPDATE_SELECTED_ROW`;
export const UPDATE_DROPDOWN = `${NAME}/UPDATE_DROPDOWN`;

export const toggleDisplayDialog = () => ({
  type: TOGGLE_DISPLAY_DIALOG,
});

export const updateSelectedRow = (value) => ({
  type: UPDATE_SELECTED_ROW,
  value: value
});

export const updateDropdown = (value) => ({
  type: UPDATE_DROPDOWN,
  value: value
});
