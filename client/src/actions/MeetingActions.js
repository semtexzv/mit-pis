import {NAME} from "../constants/MeetingConstants";

export const TOGGLE_DISPLAY_DIALOG = `${NAME}/TOGGLE_DISPLAY_DIALOG`;
export const DELETE_ROW = `${NAME}/DELETE_ROW`;
export const SAVE_ROW = `${NAME}/SAVE_ROW`;
export const SET_ADD_BUTTON = `${NAME}/SET_ADD_BUTTON`;
export const UNSET_ADD_BUTTON = `${NAME}/UNSET_ADD_BUTTON`;
export const UPDATE_SELECTED_ROW = `${NAME}/UPDATE_SELECTED_ROW`;
export const UPDATE_DATE = `${NAME}/UPDATE_DATE`;
export const UPDATE_DROPDOWN = `${NAME}/UPDATE_DROPDOWN`;
export const UPDATE_TITLE = `${NAME}/UPDATE_TITLE`;
export const UPDATE_BRAND = `${NAME}/UPDATE_BRAND`;
export const UPDATE_CUSTOMER_INFO = `${NAME}/UPDATE_CUSTOMER_INFO`;
export const UPDATE_MEETING_INFO = `${NAME}/UPDATE_MEETING_INFO`;
export const INIT_DATA = `${NAME}/INIT_DATA`;
export const SET_MEETINGS = `${NAME}/SET_MEETINGS`;
export const CREATE_MEETING = `${NAME}/CREATE_MEETING`;
export const UPDATE_MEETING = `${NAME}/UPDATE_MEETING`;
export const SET_CUSTOMERS = `${NAME}/SET_CUSTOMERS`;

export const deleteRow = () => ({
  type: DELETE_ROW,
});

export const saveRow = () => ({
  type: SAVE_ROW,
});

export const setAddButton = () => ({
  type: SET_ADD_BUTTON,
});

export const unsetAddButton = () => ({
  type: UNSET_ADD_BUTTON,
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

export const updateDropdown = (data) => ({
  type: UPDATE_DROPDOWN,
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

export const initData = (id) => ({
  type: INIT_DATA,
  payload: id,
});

export const setMeetings = (meetings) => ({
  type: SET_MEETINGS,
  payload: meetings,
});

export const setCustomers = (customers) => ({
  type: SET_CUSTOMERS,
  payload: customers,
});

export const createMeeting = (data) => ({
  type: CREATE_MEETING,
  payload: data,
});

export const updateMeeting = (meeting) => ({
  type: UPDATE_MEETING,
  payload: meeting,
});
