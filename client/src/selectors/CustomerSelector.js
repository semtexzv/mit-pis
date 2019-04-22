import {NAME} from "../constants/CustomerConstants";

const getModel = (state) => state.get(NAME);

export const getCustomerData = (state) => getModel(state).get("customerData");
export const getDisplayDialog = (state) => getModel(state).get("displayDialog");
export const getAddButton = (state) => getModel(state).get("addButton");
export const getName = (state) => getModel(state).get("name");
export const getSurname = (state) => getModel(state).get("surname");
export const getTitle = (state) => getModel(state).get("title");
export const getBrand = (state) => getModel(state).get("brand");
export const getInfo = (state) => getModel(state).get("info");
export const getCustomerId = (state) => getModel(state).get("id");
export const getCustomer = (state) => getModel(state).get("customer");
export const getCustomerCreated = (state) => getModel(state).get("created");
