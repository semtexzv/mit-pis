import {NAME} from "../constants/MeetingConstants";

const getModel = (state) => state.get(NAME);

export const getMeetingData = (state) => getModel(state).get("meetingData");
export const getAllCustomers = (state) => getModel(state).get("allCustomers");
export const getDialogHeader = (state) => getModel(state).get("dialogHeader");
export const getDisplayDialog = (state) => getModel(state).get("displayDialog");
export const getAddButton = (state) => getModel(state).get("addButton");
export const getCustomerId = (state) => getModel(state).get("customerId");
export const getDate = (state) => getModel(state).get("date");
export const getCustomerInfo = (state) => getModel(state).get("customerInfo");
export const getMeetingInfo = (state) => getModel(state).get("meetingInfo");
