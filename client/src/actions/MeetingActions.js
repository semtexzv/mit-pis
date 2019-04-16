import {NAME} from "../constants/MeetingConstants";

export const TOGGLE_DISPLAY_DIALOG = `${NAME}/TOGGLE_DISPLAY_DIALOG`;
export const DELETE_ROW = `${NAME}/DELETE_ROW`;
export const SAVE_ROW = `${NAME}/SAVE_ROW`;
export const ADD_ROW = `${NAME}/ADD_ROW`;
export const UPDATE_SELECTED_ROW = `${NAME}/UPDATE_SELECTED_ROW`;
export const UPDATE_DATE = `${NAME}/UPDATE_DATE`;
export const UPDATE_NAME = `${NAME}/UPDATE_NAME`;
export const UPDATE_SURNAME = `${NAME}/UPDATE_SURNAME`;
export const UPDATE_TITLE = `${NAME}/UPDATE_TITLE`;
export const UPDATE_BRAND = `${NAME}/UPDATE_BRAND`;
export const UPDATE_CUSTOMER_INFO = `${NAME}/UPDATE_CUSTOMER_INFO`;
export const UPDATE_MEETING_INFO = `${NAME}/UPDATE_MEETING_INFO`;

export const deleteRow = () => ({
  type: DELETE_ROW,
});

export const saveRow = () => ({
  type: SAVE_ROW,
});

export const addRow = () => ({
  type: ADD_ROW,
});

export const toggleDisplayDialog = () => ({
  type: TOGGLE_DISPLAY_DIALOG,
});

export const updateSelectedRow = (data) => ({
  type: UPDATE_SELECTED_ROW,
  value: data,
});

export const updateDate = (data) => ({
  type: UPDATE_DATE,
  value: data,
});

export const updateName = (data) => ({
  type: UPDATE_NAME,
  value: data,
});

export const updateSurname = (data) => ({
  type: UPDATE_SURNAME,
  value: data,
});

export const updateTitle = (data) => ({
  type: UPDATE_TITLE,
  value: data,
});

export const updateBrand = (data) => ({
  type: UPDATE_BRAND,
  value: data,
});

export const updateCustomerInfo = (data) => ({
  type: UPDATE_CUSTOMER_INFO,
  value: data,
});

export const updateMeetingInfo = (data) => ({
  type: UPDATE_MEETING_INFO,
  value: data,
});
