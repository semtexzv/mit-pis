import {NAME} from "../constants/EmployeeConstants";

const getModel = (state) => state.get(NAME);

export const getEmployeeData = (state) => getModel(state).get("employeeData");
export const getDisplayDialog = (state) => getModel(state).get("displayDialog");
export const getName = (state) => getModel(state).get("name");
export const getSurname = (state) => getModel(state).get("surname");
export const getRole = (state) => getModel(state).get("role");
export const getRoleList = (state) => getModel(state).get("roleList");
export const getPasswordOld = (state) => getModel(state).get("passwordOld");
export const getPasswordNew = (state) => getModel(state).get("passwordNew");
export const getPasswordCheck = (state) => getModel(state).get("passwordCheck");
