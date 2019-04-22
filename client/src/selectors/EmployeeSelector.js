import {NAME} from "../constants/EmployeeConstants";

const getModel = (state) => state.get(NAME);

export const getEmployeeData = (state) => getModel(state).get("employeeData");
export const getDisplayDialog = (state) => getModel(state).get("displayDialog");
export const getDialogHeader = (state) => getModel(state).get("dialogHeader");
export const getFieldsetLegend = (state) => getModel(state).get("fieldsetLegend");
export const getAddButton = (state) => getModel(state).get("addButton");
export const getName = (state) => getModel(state).get("name");
export const getSurname = (state) => getModel(state).get("surname");
export const getRole = (state) => getModel(state).get("role");
export const getUsername = (state) => getModel(state).get("username");
export const getRoleList = (state) => getModel(state).get("roleList");
export const getChangePassword = (state) => getModel(state).get("changePassword");
export const getPasswordOld = (state) => getModel(state).get("passwordOld");
export const getPasswordOld_fromBE = (state) => getModel(state).get("passwordOld_fromBE");
export const getPasswordNew = (state) => getModel(state).get("passwordNew");
export const getPasswordCheck = (state) => getModel(state).get("passwordCheck");

export const getEmployeeId = (state) => getModel(state).get("id");
export const getEmployeeRow = (state) => getModel(state).get("row");
