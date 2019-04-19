import {NAME} from "../constants/SpecializationConstants";

const getModel = (state) => state.get(NAME);

export const getAllBrands = (state) => getModel(state).get("allBrands");
export const getAllEmployees = (state) => getModel(state).get("allEmployees");
export const getEmployeeId = (state) => getModel(state).get("employeeId");
export const getChosenBrands = (state) => getModel(state).get("chosenBrands");
export const getWarning = (state) => getModel(state).get("warning");
