import {NAME} from "../constants/ConnectEmployeeConstants";

const getModel = (state) => state.get(NAME);

export const getDisplayDialog = (state) => getModel(state).get("displayDialog");
export const getCustomerData = (state) => getModel(state).get("customerData");
export const getCustomerName = (state) => getModel(state).get("customerName");
export const getCustomerSurname = (state) => getModel(state).get("customerSurname");
export const getCustomerBrand = (state) => getModel(state).get("customerBrand");

export const getPotentialEmployee = (state) => getModel(state).get("potentialEmployee");
export const getEmployeeId = (state) => getModel(state).get("employeeId");
export const getEditedCustomer = (state) => getModel(state).get("editedCustomer");
export const getCustomerId = (state) => getModel(state).get("customerId");
