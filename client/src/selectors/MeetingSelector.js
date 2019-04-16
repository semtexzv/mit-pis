import {NAME} from "../constants/MeetingConstants";

const getModel = (state) => state.get(NAME);

export const getMeetingData = (state) => getModel(state).get("meetingData");
export const getAllCustomers = (state) => getModel(state).get("allCustomers");
export const getDisplayDialog = (state) => getModel(state).get("displayDialog");
export const getDate = (state) => getModel(state).get("date");
export const getName = (state) => getModel(state).get("name");
export const getSurname = (state) => getModel(state).get("surname");
export const getTitle = (state) => getModel(state).get("title");
export const getBrand = (state) => getModel(state).get("brand");
export const getCustomerInfo = (state) => getModel(state).get("customerInfo");
export const getMeetingInfo = (state) => getModel(state).get("meetingInfo");
