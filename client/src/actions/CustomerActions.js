import {NAME} from "../constants/CustomerConstants";

export const TOGGLE_DISPLAY_DIALOG = `${NAME}/TOGGLE_DISPLAY_DIALOG`;
export const SET_ADD_BUTTON = `${NAME}/SET_ADD_BUTTON`;
export const UNSET_ADD_BUTTON = `${NAME}/UNSET_ADD_BUTTON`;
export const UPDATE_SELECTED_ROW = `${NAME}/UPDATE_SELECTED_ROW`;

export const UPDATE_NAME = `${NAME}/UPDATE_NAME`;
export const UPDATE_SURNAME = `${NAME}/UPDATE_SURNAME`;
export const UPDATE_TITLE = `${NAME}/UPDATE_TITLE`;
export const UPDATE_BRAND = `${NAME}/UPDATE_BRAND`;
export const UPDATE_INFO = `${NAME}/UPDATE_INFO`;
export const INIT_CUSTOMER_DATA = `${NAME}/INIT_CUSTOMER_DATA`;

export const DELETE_ROW = `${NAME}/DELETE_ROW`;
export const SAVE_ROW = `${NAME}/SAVE_ROW`;
export const SET_CUSTOMERS = `${NAME}/SET_CUSTOMERS`;

export const toggleDisplayDialog = () => ({
  type: TOGGLE_DISPLAY_DIALOG,
});

export const setAddButton = () => ({
  type: SET_ADD_BUTTON,
});

export const unsetAddButton = () => ({
  type: UNSET_ADD_BUTTON,
});

export const updateSelectedRow = (data) => ({
  type: UPDATE_SELECTED_ROW,
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

export const updateInfo = (data) => ({
  type: UPDATE_INFO,
  value: data,
});

export const deleteRow = () => ({
  type: DELETE_ROW,
});

export const saveRow = () => ({
  type: SAVE_ROW,
});

export const initCustomerData = () => ({
  type: INIT_CUSTOMER_DATA,
});

export const setCustomers = (customers) => ({
  type: SET_CUSTOMERS,
  payload: customers,
});
